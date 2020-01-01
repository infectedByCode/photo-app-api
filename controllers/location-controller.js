const { fetchAllLocations } = require('../models/location-models');

exports.getAllLocations = (req, res, next) => {
  fetchAllLocations()
    .then(locations => {
      res.status(200).send({ locations });
    })
    .catch(next);
};
