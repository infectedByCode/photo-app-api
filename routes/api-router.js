const apiRouter = require('express').Router();
const authRouter = require('./auth-router');
const userRouter = require('./user-router');
const locationRouter = require('./location-router');

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/locations', locationRouter);

module.exports = apiRouter;
