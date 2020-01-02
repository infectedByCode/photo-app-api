const { fetchAllLocations, createLocation } = require('../models/location-models');

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
