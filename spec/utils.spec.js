process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const { validateEmail, validateStringInput, validateQuery, formatLocation } = require('../utils/utils');

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
  it('returns true when a valid string with only alphanumerical characters are input and spaces', () => {
    expect(validateStringInput('Matthew')).to.equal(true);
    expect(validateStringInput('StarLord2001')).to.equal(true);
    expect(validateStringInput('PepeTheFrong')).to.equal(true);
    expect(validateStringInput('1288Winner')).to.equal(true);
    expect(validateStringInput('United Kingdom')).to.equal(true);
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

describe.only('formatLocation', () => {
  it('returns an empty string when passed one', () => {
    expect(formatLocation('')).to.equal('');
  });
  it('returns capitalised location data when name is one word', () => {
    expect(formatLocation('liVerPool')).to.equal('Liverpool');
    expect(formatLocation('hue')).to.equal('Hue');
  });
  it('returns capitalised location data when the name is more than one word', () => {
    expect(formatLocation('united kingdom')).to.equal('United Kingdom');
    expect(formatLocation('SOUTH AMERIca')).to.equal('South America');
  });
});
