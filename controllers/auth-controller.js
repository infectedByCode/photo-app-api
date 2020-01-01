const { createUser } = require('../models/auth-models');

exports.postUser = (req, res, next) => {
  const userData = req.body;

  createUser(userData)
    .then(user => {
      res.status(201).json({ user: user[0] });
    })
    .catch(next);
};
