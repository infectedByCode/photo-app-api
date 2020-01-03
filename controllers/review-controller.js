const { createReview, updateReviewByID } = require('../models/review-model');

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
