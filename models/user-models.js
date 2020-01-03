const connection = require('../db/connection');
const { validateUser, validateEmail, validateStringInput } = require('../utils/utils');

exports.fetchUserByUsername = ({ username }) => {
  const isValidUsername = validateUser(username);

  if (!isValidUsername) {
    return Promise.reject({ status: 400, msg: 'Invalid input for username. Please only use alphanumeric characters.' });
  }

  return connection('users')
    .first()
    .where('username', username);
};

exports.updateUserByUsername = ({ username }, userData) => {
  const { email, ...inputs } = userData;

  const isValidUsername = validateUser(username);
  const isValidEmail = validateEmail(email);
  const areInputsValid = Object.values(inputs).every(input => {
    return validateStringInput(input);
  });

  if (!isValidUsername) {
    return Promise.reject({ status: 400, msg: 'Invalid input for username. Please only use alphanumeric characters.' });
  }

  if (!isValidEmail) {
    return Promise.reject({ status: 400, msg: 'Invalid email format.' });
  }

  if (!areInputsValid) {
    return Promise.reject({
      status: 400,
      msg: 'Invalid input in form fields. Please only use alphanumeric characters.'
    });
  }

  return connection('users')
    .where('username', username)
    .update({ email, first_name: inputs.first_name, last_name: inputs.last_name }, '*');
};

exports.removeUserByUsername = ({ username }) => {
  const isValidUsername = validateUser(username);

  if (!isValidUsername) {
    return Promise.reject({ status: 400, msg: 'Invalid input for username. Please only use alphanumeric characters.' });
  }

  return connection('users')
    .select('*')
    .where('username', username)
    .then(user => {
      if (!user.length) return Promise.reject({ status: 404, msg: 'User can not be found' });
      return connection('users')
        .where('username', username)
        .del();
    });
};

exports.fetchAllUsers = (limit = 5) => {
  const isLimitInvalid = /[^\d]/.test(limit);

  return connection('users')
    .select('*')
    .modify(query => {
      if (!isLimitInvalid) query.limit(limit);
      return query;
    })
    .then(users => {
      const totalUsers = connection('users').count('* as total_users');
      return Promise.all([users, totalUsers]);
    });
};
