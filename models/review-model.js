const connection = require('../db/connection');
const { validateStringInput, validateURL, validateUUID } = require('../utils/utils');

exports.createReview = reviewData => {
  const { location_id, author, image_url, ...strings } = reviewData;

  const areStringsValid = Object.values(strings).every(data => {
    return validateStringInput(data) || validateUUID(data) || validateURL(data);
  });
  const isAuthorValid = validateUUID(author);
  const isURLValid = validateURL(image_url);

  if (!areStringsValid || !isAuthorValid || !isURLValid) {
    return Promise.reject({
      status: 400,
      msg: 'Some data is invalid, only alphanumeric characters and the following special characters are valid .,&$\'" '
    });
  }

  const { review_title, review_body } = reviewData;

  return connection('reviews').insert({ location_id, author, image_url, review_title, review_body }, '*');
};

exports.updateReviewByID = (review_id, review_title, review_body) => {
  const isDataValid = validateStringInput(review_title) && validateStringInput(review_body);

  if (!isDataValid) return Promise.reject({ status: 400, msg: 'Title or body contains invalid characters.' });

  return connection('reviews')
    .select('*')
    .where({ review_id })
    .then(review => {
      if (!review.length) return Promise.reject({ status: 404, msg: 'Review does not exist.' });
      else
        return connection('reviews')
          .where({ review_id })
          .update({ review_title, review_body }, '*');
    });
};

exports.removeReviewByID = review_id => {
  review_id = /\d/.test(review_id) ? +review_id : null;

  if (!review_id) return Promise.reject({ status: 400, msg: 'Please enter a valid review_id' });

  return connection('reviews')
    .select('*')
    .where({ review_id })
    .then(review => {
      if (!review.length) return Promise.reject({ status: 404, msg: 'Review not found' });
      else
        return connection('reviews')
          .where({ review_id })
          .del();
    });
};

exports.fetchCommentsByReviewID = review_id => {
  review_id = /\d/.test(review_id) ? +review_id : null;

  if (!review_id) return Promise.reject({ status: 400, msg: 'Please enter a valid review_id' });

  return connection('reviews')
    .select('*')
    .where({ review_id })
    .then(review => {
      if (!review.length) return Promise.reject({ status: 404, msg: 'Review not found' });
      else
        return connection('comments')
          .select('*')
          .where({ review_id });
    });
};

exports.createCommentByReviewID = (review_id, commentData) => {
  const { author, comment_body } = commentData;

  if (!validateUUID(author) || !validateStringInput(comment_body)) {
    return Promise.reject({ status: 400, msg: 'Invalid characters in the comment_body or author uuid not valid.' });
  }

  return connection('comments').insert({ review_id, author, comment_body }, '*');
};

exports.fetchReviewByID = review_id => {
  review_id = /\d/.test(review_id) ? +review_id : null;

  if (!review_id) return Promise.reject({ status: 400, msg: 'Please enter a valid review_id' });

  return connection('reviews')
    .first()
    .where({ review_id })
    .then(review => {
      if (review === undefined) return Promise.reject({ status: 404, msg: 'Review not found' });
      else return review;
    });
};
