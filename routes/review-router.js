const reviewRouter = require('express').Router();
const { postReview } = require('../controllers/review-controller');
const { handle405Errors } = require('../errors');

reviewRouter
  .route('/')
  .post(postReview)
  .all(handle405Errors);

module.exports = reviewRouter;
