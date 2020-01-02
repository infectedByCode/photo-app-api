exports.validateEmail = email => {
  email = email.trim();

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(String(email).toLowerCase());
};

exports.validateStringInput = str => {
  str = str.trim();

  if (!str.length || str === undefined) return false;

  const validCharacters = /([^A-Z\d\ ])/gi;

  return !validCharacters.test(str);
};

exports.validateQuery = str => {
  str = str.trim();
  if (!str.length || str === undefined) return false;
  return !/[^a-z\ ]/gi.test(str);
};
