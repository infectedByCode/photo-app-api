const apiRouter = require('express').Router();
const authRouter = require('./auth-router');
const userRouter = require('./user-router');

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);

module.exports = apiRouter;
