const connection = require('../db/connection');
const { validateQuery, validateStringInput } = require('../utils/utils');

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
exports.createLocation = locationData => {
  let isDataValid = Object.values(locationData).every(data => {
    return validateStringInput(data);
  });

  const { city, country, continent } = locationData;

  if (!isDataValid) {
    return Promise.reject({ status: 400, msg: 'Please only input alphanumeric characters and spaces.' });
  }

  return connection('locations').insert({ city, country, continent }, '*');
};
