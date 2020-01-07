const reviewRouter = require('express').Router();
const {
  postReview,
  patchReviewByID,
  deleteReviewByID,
  getCommentsByReviewID,
  postCommentByReviewID,
  getReviewByID
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
  .get(getReviewByID)
  .all(handle405Errors);

reviewRouter
  .route('/:review_id/comments')
  .get(getCommentsByReviewID)
  .post(postCommentByReviewID)
  .all(handle405Errors);

module.exports = reviewRouter;
