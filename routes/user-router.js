const userRouter = require('express').Router();
const { getUserByUsername, patchUserByUsername } = require('../controllers/user-controller');
const { handle405Errors } = require('../errors');

userRouter
  .route('/:username')
  .get(getUserByUsername)
  .patch(patchUserByUsername)
  .all(handle405Errors);

module.exports = userRouter;
