const reviewRouter = require('express').Router();
const { postReview, patchReviewByID } = require('../controllers/review-controller');
const { handle405Errors } = require('../errors');

reviewRouter
  .route('/')
  .post(postReview)
  .all(handle405Errors);

reviewRouter
  .route('/:review_id')
  .patch(patchReviewByID)
  .all(handle405Errors);

module.exports = reviewRouter;
