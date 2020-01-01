const userRouter = require('express').Router();
const {
  getUserByUsername,
  patchUserByUsername,
  deleteUserByUsername,
  getAllUsers
} = require('../controllers/user-controller');
const { handle405Errors } = require('../errors');

userRouter
  .route('/')
  .get(getAllUsers)
  .all(handle405Errors);

userRouter
  .route('/:username')
  .get(getUserByUsername)
  .patch(patchUserByUsername)
  .delete(deleteUserByUsername)
  .all(handle405Errors);

module.exports = userRouter;
