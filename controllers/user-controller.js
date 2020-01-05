const { fetchUserByUserID, updateUserByUserID, removeUserByUserID, fetchAllUsers } = require('../models/user-models');

exports.getUserByUserID = (req, res, next) => {
  const user_id = req.params;

  fetchUserByUserID(user_id)
    .then(user => {
      if (!user) return Promise.reject({ status: 404, msg: 'User can not be found' });
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.patchUserByUserID = (req, res, next) => {
  const user_id = req.params;
  const userData = req.body;

  updateUserByUserID(user_id, userData)
    .then(([user]) => {
      if (!user) return Promise.reject({ status: 404, msg: 'User can not be found' });
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.deleteUserByUserID = (req, res, next) => {
  const user_id = req.params;

  removeUserByUserID(user_id)
    .then(() => {
      fetchUserByUserID(user_id)
        .then(() => {
          res.sendStatus(204);
        })
        .catch(next);
    })
    .catch(next);
};

exports.getAllUsers = (req, res, next) => {
  const { limit } = req.query;

  fetchAllUsers(limit)
    .then(userData => {
      const users = userData[0];
      const count = userData[1][0].total_users;

      res.status(200).send({ userData: { users, total_users: count } });
    })
    .catch(next);
};
