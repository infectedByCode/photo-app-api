const locationRouter = require('express').Router();
const {
  getAllLocations,
  postLocation,
  getReviewsByLocation,
  getLocationByID
} = require('../controllers/location-controller');
const { handle405Errors } = require('../errors');

locationRouter
  .route('/')
  .get(getAllLocations)
  .post(postLocation)
  .all(handle405Errors);

locationRouter
  .route('/:location_id')
  .get(getLocationByID)
  .all(handle405Errors);

locationRouter
  .route('/:location_id/reviews')
  .get(getReviewsByLocation)
  .all(handle405Errors);

module.exports = locationRouter;
