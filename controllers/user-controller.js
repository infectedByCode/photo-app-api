const { fetchUserByUsername, updateUserByUsername, removeUserByUsername } = require('../models/user-models');

exports.getUserByUsername = (req, res, next) => {
  const username = req.params;

  fetchUserByUsername(username)
    .then(user => {
      if (!user) return Promise.reject({ status: 404, msg: 'User can not be found' });
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.patchUserByUsername = (req, res, next) => {
  const username = req.params;
  const userData = req.body;

  updateUserByUsername(username, userData)
    .then(([user]) => {
      if (!user) return Promise.reject({ status: 404, msg: 'User can not be found' });
      res.status(200).send({ user });
    })
    .catch(next);
};

exports.deleteUserByUsername = (req, res, next) => {
  const username = req.params;

  removeUserByUsername(username)
    .then(() => {
      fetchUserByUsername(username)
        .then(user => {
          if (!user) return Promise.reject({ status: 404, msg: 'User can not be found' });
          else res.sendStatus(204);
        })
        .catch(next);
    })
    .catch(next);
};
