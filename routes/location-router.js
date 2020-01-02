const locationRouter = require('express').Router();
const { getAllLocations, postLocation } = require('../controllers/location-controller');
const { handle405Errors } = require('../errors');

locationRouter
  .route('/')
  .get(getAllLocations)
  .post(postLocation)
  .all(handle405Errors);

module.exports = locationRouter;
