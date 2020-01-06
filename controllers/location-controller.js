const {
  fetchAllLocations,
  createLocation,
  fetchReviewsByLocation,
  fetchLocationByID
} = require('../models/location-models');

exports.getAllLocations = (req, res, next) => {
  const { continent } = req.query;

  fetchAllLocations(continent)
    .then(locations => {
      res.status(200).send({ locations });
    })
    .catch(next);
};

exports.postLocation = (req, res, next) => {
  const locationData = req.body;

  createLocation(locationData)
    .then(([location]) => {
      res.status(201).send({ location });
    })
    .catch(next);
};

exports.getReviewsByLocation = (req, res, next) => {
  const { location_id } = req.params;

  fetchReviewsByLocation(location_id)
    .then(reviews => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

exports.getLocationByID = (req, res, next) => {
  const { location_id } = req.params;

  fetchLocationByID(location_id)
    .then(location => {
      res.status(200).send({ location });
    })
    .catch(next);
};
