const connection = require('../db/connection');
const { validateQuery } = require('../utils/utils');

exports.fetchAllLocations = continent => {
  const continents = ['Europe', 'North American', 'South America', 'Asia', 'Oceania', 'Africa', 'Antarctica'];
  let isValidQuery;

  if (continent) {
    isValidQuery = validateQuery(continent);
    continent = continent.charAt(0).toUpperCase() + continent.slice(1);
  }

  return connection('locations')
    .select('*')
    .modify(query => {
      if (isValidQuery && continents.includes(continent)) query.where('continent', continent);
      return query;
    });
};

// post location, util function to capitalise first letter
