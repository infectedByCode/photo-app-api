const { fetchAllLocations } = require('../models/location-models');

exports.getAllLocations = (req, res, next) => {
  const { continent } = req.query;

  fetchAllLocations(continent)
    .then(locations => {
      console.log(locations);
      res.status(200).send({ locations });
    })
    .catch(next);
};
