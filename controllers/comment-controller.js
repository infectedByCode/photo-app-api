const { removeCommentByID } = require('../models/comment-model');

exports.deleteCommentByID = (req, res, next) => {
  const { comment_id } = req.params;

  removeCommentByID(comment_id)
    .then(() => {
      res.sendStatus(204);
    })
    .catch(next);
};
