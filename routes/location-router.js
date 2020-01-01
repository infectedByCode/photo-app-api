const locationRouter = require('express').Router();
const { getAllLocations } = require('../controllers/location-controller');
const { handle405Errors } = require('../errors');

locationRouter
  .route('/')
  .get(getAllLocations)
  .all(handle405Errors);

module.exports = locationRouter;
