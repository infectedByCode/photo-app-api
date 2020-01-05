const connection = require('../db/connection');
const { validateEmail, validateStringInput, validateUUID } = require('../utils/utils');

exports.fetchUserByUserID = ({ user_id }) => {
  const isUUIDValid = validateUUID(user_id);

  if (!isUUIDValid) {
    return Promise.reject({ status: 400, msg: 'Invalid input for user_id.' });
  }

  return connection('users')
    .first()
    .where('user_id', user_id);
};

exports.updateUserByUserID = ({ user_id }, userData) => {
  const { email, ...inputs } = userData;
  const isUUIDValid = validateUUID(user_id);
  const isValidEmail = validateEmail(email);
  const areInputsValid = Object.values(inputs).every(input => {
    return validateStringInput(input);
  });

  if (!isUUIDValid) {
    return Promise.reject({ status: 400, msg: 'Invalid input for user_id.' });
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
    .where('user_id', user_id)
    .update({ email, first_name: inputs.first_name, last_name: inputs.last_name }, '*');
};

exports.removeUserByUserID = ({ user_id }) => {
  const isUUIDValid = validateUUID(user_id);

  if (!isUUIDValid) {
    return Promise.reject({ status: 400, msg: 'Invalid input for user_id.' });
  }

  return connection('users')
    .select('*')
    .where('user_id', user_id)
    .then(user => {
      if (!user.length) return Promise.reject({ status: 404, msg: 'User can not be found' });
      return connection('users')
        .where('user_id', user_id)
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
