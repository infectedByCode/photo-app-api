const connection = require('../db/connection');
const { validateStringInput, validateEmail } = require('../utils/utils');

exports.fetchUserByUsername = ({ username }) => {
  const isValidUsername = validateStringInput(username);

  if (!isValidUsername) {
    return Promise.reject({ status: 400, msg: 'Invalid input for username. Please only use alphanumeric characters.' });
  }

  return connection('users')
    .first()
    .where('username', username);
};

exports.updateUserByUsername = ({ username }, userData) => {
  const { email, ...inputs } = userData;

  const isValidUsername = validateStringInput(username);
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
