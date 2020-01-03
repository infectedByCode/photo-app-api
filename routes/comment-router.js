const commentRouter = require('express').Router();
const { deleteCommentByID } = require('../controllers/comment-controller');
const { handle405Errors } = require('../errors');

commentRouter
  .route('/:comment_id')
  .delete(deleteCommentByID)
  .all(handle405Errors);

module.exports = commentRouter;
