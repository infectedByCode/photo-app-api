const authRouter = require('express').Router();
const { postUser } = require('../controllers/auth-controller');
const { handle405Errors } = require('../errors');

authRouter
  .route('/signup')
  .post(postUser)
  .all(handle405Errors);

module.exports = authRouter;
