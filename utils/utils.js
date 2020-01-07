exports.validateEmail = email => {
  email = email.trim();

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return emailRegex.test(String(email).toLowerCase());
};

exports.validateStringInput = str => {
  str = str.trim();

  if (!str.length || str === undefined) return false;

  const validCharacters = /([^A-Z\d.,&$()Å-ôé'"\ ])/gi;

  return !validCharacters.test(str);
};

exports.validateUser = str => {
  str = str.trim();

  if (!str.length || str === undefined) return false;

  const validCharacters = /([^A-Z\d])/gi;

  return !validCharacters.test(str);
};

exports.validateQuery = str => {
  str = str.trim();
  if (!str.length || str === undefined) return false;
  return !/[^a-z\ ]/gi.test(str);
};

exports.formatLocation = str => {
  str = str.trim();

  return str
    .split(' ')
    .map(word => word.slice(0, 1).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

exports.validateURL = url => {
  const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-d][a-zA-Z\d-]+[a-zA-Z\d]\.[^\s]{2,}|www\.[a-zA-Z\d][a-zA-Z\d-]+[a-zA-Z\d]\.[^\s]{2,})/gi;

  return urlRegex.test(url);
};

exports.validateUUID = user_id => {
  user_id = user_id.trim();

  if (!user_id.length) return false;

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const uidFirebaseRegex = /[^a-z\d]{1,128}/i;

  return uuidRegex.test(user_id) || !uidFirebaseRegex.test(user_id);
};
