const connection = require('../db/connection');
const { validateQuery, validateStringInput, formatLocation } = require('../utils/utils');

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

exports.createLocation = locationData => {
  let isDataValid = Object.values(locationData).every(data => {
    return validateStringInput(data);
  });

  if (!isDataValid) {
    return Promise.reject({ status: 400, msg: 'Please only input alphanumeric characters and spaces.' });
  }

  let { city, country, continent } = locationData;

  if (!city || !country || !continent)
    return Promise.reject({ status: 400, msg: 'Missing data - Please include a city, country and continent.' });

  if (city) city = formatLocation(city);
  if (country) country = formatLocation(country);
  if (continent) continent = formatLocation(continent);

  return connection('locations')
    .select('*')
    .where({
      city,
      country,
      continent
    })
    .then(location => {
      if (!location.length) return connection('locations').insert({ city, country, continent }, '*');
      else return Promise.reject({ status: 400, msg: 'Location already exists.' });
    });
};
