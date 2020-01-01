const connection = require('../db/connection');
const { validateQuery } = require('../utils/utils');

exports.fetchAllLocations = continent => {
  let isValidQuery;

  if (continent) {
    isValidQuery = validateQuery(continent);
    continent = continent.charAt(0).toUpperCase() + continent.slice(1);
  }

  return connection('locations')
    .select('*')
    .modify(query => {
      if (isValidQuery) query.where('continent', continent);
      return query;
    });
};

// post location, util function to capitalise first letter
