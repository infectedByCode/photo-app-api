const connection = require('../db/connection');

exports.removeCommentByID = comment_id => {
  comment_id = /\d/.test(comment_id) ? +comment_id : null;

  if (!comment_id) return Promise.reject({ status: 400, msg: 'Comment ID must be a number' });

  return connection('comments')
    .select('*')
    .where({ comment_id })
    .then(comment => {
      if (!comment.length) return Promise.reject({ status: 404, msg: 'Comment can not be found.' });
      else
        return connection('comments')
          .where({ comment_id })
          .del();
    });
};
