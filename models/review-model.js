const connection = require('../db/connection');
const { validateStringInput, validateURL, validateAuthorUUID } = require('../utils/utils');

exports.createReview = reviewData => {
  const { location_id, author, image_url, ...strings } = reviewData;

  const areStringsValid = Object.values(strings).every(data => {
    return validateStringInput(data) || validateAuthorUUID(data) || validateURL(data);
  });
  const isAuthorValid = validateAuthorUUID(author);
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
