const userRouter = require('express').Router();
const {
  getUserByUserID,
  patchUserByUserID,
  deleteUserByUserID,
  getAllUsers
} = require('../controllers/user-controller');
const { handle405Errors } = require('../errors');

userRouter
  .route('/')
  .get(getAllUsers)
  .all(handle405Errors);

userRouter
  .route('/:user_id')
  .get(getUserByUserID)
  .patch(patchUserByUserID)
  .delete(deleteUserByUserID)
  .all(handle405Errors);

module.exports = userRouter;
