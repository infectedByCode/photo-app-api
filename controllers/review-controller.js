const { createReview } = require('../models/review-model');

exports.postReview = (req, res, next) => {
  const reviewData = req.body;

  createReview(reviewData)
    .then(([review]) => {
      res.status(201).send({ review });
    })
    .catch(next);
};
