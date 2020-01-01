const connection = require('../db/connection');
const { validateStringInput } = require('../utils/utils');

exports.fetchUserByUsername = ({ username }) => {
  const isValidUsername = validateStringInput(username);

  if (!isValidUsername) {
    // return Promise.reject({status:400, msg: 'Invalid input in text fields. Please try again.'})
  }

  return connection('users')
    .first()
    .where('username', username);
};
