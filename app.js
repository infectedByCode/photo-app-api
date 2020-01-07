const express = require('express');
const app = express();
const cors = require('cors');
const apiRouter = require('./routes/api-router');
const { invalidURLError, customErrorHandlers, psqlErrorHandlers, handleServerErrors } = require('./errors');

app.use(cors());
app.use(express.json());

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api', apiRouter);

app.all('/*', invalidURLError);

app.use(customErrorHandlers);
app.use(psqlErrorHandlers);
app.use(handleServerErrors);

module.exports = app;
