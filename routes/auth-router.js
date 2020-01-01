const authRouter = require('express').Router();
const { postUser } = require('../controllers/auth-controller');

authRouter.get('/signup', postUser);

module.exports = authRouter;
