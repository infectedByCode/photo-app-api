const reviewRouter = require('express').Router();
const {
  postReview,
  patchReviewByID,
  deleteReviewByID,
  getCommentsByReviewID
} = require('../controllers/review-controller');
const { handle405Errors } = require('../errors');

reviewRouter
  .route('/')
  .post(postReview)
  .all(handle405Errors);

reviewRouter
  .route('/:review_id')
  .patch(patchReviewByID)
  .delete(deleteReviewByID)
  .all(handle405Errors);

reviewRouter
  .route('/:review_id/comments')
  .get(getCommentsByReviewID)
  .all(handle405Errors);

module.exports = reviewRouter;
