const {
  createReview,
  updateReviewByID,
  removeReviewByID,
  fetchCommentsByReviewID,
  createCommentByReviewID,
  fetchReviewByID
} = require('../models/review-model');

exports.postReview = (req, res, next) => {
  const reviewData = req.body;

  createReview(reviewData)
    .then(([review]) => {
      res.status(201).send({ review });
    })
    .catch(next);
};

exports.patchReviewByID = (req, res, next) => {
  const { review_id } = req.params;
  const { review_title, review_body } = req.body;

  updateReviewByID(review_id, review_title, review_body)
    .then(([review]) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.deleteReviewByID = (req, res, next) => {
  const { review_id } = req.params;

  removeReviewByID(review_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};

exports.getCommentsByReviewID = (req, res, next) => {
  const { review_id } = req.params;

  fetchCommentsByReviewID(review_id)
    .then(comments => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.postCommentByReviewID = (req, res, next) => {
  const { review_id } = req.params;
  const { ...commentData } = req.body;

  createCommentByReviewID(review_id, commentData)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.getReviewByID = (req, res, next) => {
  const { review_id } = req.params;

  fetchReviewByID(review_id)
    .then(review => {
      res.status(200).send({ review });
    })
    .catch(next);
};
