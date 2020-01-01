const { fetchUserByUsername } = require('../models/user-models');

exports.getUserByUsername = (req, res, next) => {
  const username = req.params;

  fetchUserByUsername(username)
    .then(user => {
      if (!user) return Promise.reject({ status: 404, msg: 'User can not be found' });
      res.status(200).send({ user });
    })
    .catch(next);
};
