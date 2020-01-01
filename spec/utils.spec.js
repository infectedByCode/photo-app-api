process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const { validateEmail, validateStringInput, validateQuery } = require('../utils/utils');

describe('validateEmail', () => {
  it('returns false when an empty string is passed in', () => {
    expect(validateEmail('')).to.equal(false);
  });
  it('returns true when a valid email is passed in', () => {
    let email = 'mike@gmail.com';
    expect(validateEmail(email)).to.equal(true);

    email = 'mike@yahoo.co.uk';
    expect(validateEmail(email)).to.equal(true);

    email = 'mike@aol.com';
    expect(validateEmail(email)).to.equal(true);
  });
  it('works with whitespace on email', () => {
    let email = '    whitespace@gmail.com          ';
    expect(validateEmail(email)).to.equal(true);
  });
  it('returns false when an invalid email is passed in', () => {
    let email = 'pete@aol';
    expect(validateEmail(email)).to.equal(false);

    email = 'pete@gmail';
    expect(validateEmail(email)).to.equal(false);
  });
});

describe('validateStringInput', () => {
  it('returns false when an empty string is passed in', () => {
    expect(validateStringInput('')).to.equal(false);
  });
  it('returns true when a valid string with only alphanumerical characters are input', () => {
    expect(validateStringInput('Matthew')).to.equal(true);
    expect(validateStringInput('StarLord2001')).to.equal(true);
    expect(validateStringInput('PepeTheFrong')).to.equal(true);
    expect(validateStringInput('1288Winner')).to.equal(true);
  });
  it('returns false when illegal charachers are input', () => {
    expect(validateStringInput('Real user "DROP DATABASE"')).to.equal(false);
    expect(validateStringInput('?%*')).to.equal(false);
  });
});

describe('validateQuery', () => {
  it('returns false when an empty string is passed in', () => {
    expect(validateQuery('')).to.equal(false);
  });
  it('returns true when a valid query is passed in', () => {
    expect(validateQuery('europe')).to.equal(true);
    expect(validateQuery('North America')).to.equal(true);
  });
  it('returns false when an invalid query is passed in', () => {
    expect(validateQuery('eur0p3')).to.equal(false);
  });
});
