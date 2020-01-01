const connection = require('../db/connection');
const { validateEmail } = require('../utils/utils');

exports.createUser = userData => {
  const { user_id, first_name, last_name, username, email } = userData;

  isEmailValid = validateEmail(email);

  if (isEmailValid) {
    return connection('users').insert({ user_id, first_name, last_name, username, email }, '*');
  }
};
