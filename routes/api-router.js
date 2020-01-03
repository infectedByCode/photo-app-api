const apiRouter = require('express').Router();
const authRouter = require('./auth-router');
const userRouter = require('./user-router');
const locationRouter = require('./location-router');
const reviewRouter = require('./review-router');
const commentRouter = require('./comment-router');

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', userRouter);
apiRouter.use('/locations', locationRouter);
apiRouter.use('/reviews', reviewRouter);
apiRouter.use('/comments', commentRouter);

module.exports = apiRouter;
