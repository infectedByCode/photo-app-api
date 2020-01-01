const connection = require('../db/connection');

exports.fetchAllLocations = () => {
  return connection('locations').select('*');
};
