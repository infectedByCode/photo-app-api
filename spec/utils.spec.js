process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const {
  validateEmail,
  validateStringInput,
  validateQuery,
  formatLocation,
  validateURL,
  validateAuthorUUID,
  validateUser
} = require('../utils/utils');

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
    expect(validateStringInput('Real user ^^')).to.equal(false);
    expect(validateStringInput('?%*')).to.equal(false);
  });
});

describe('validateUser', () => {
  it('returns false when an empty string is passed in', () => {
    expect(validateUser('')).to.equal(false);
  });
  it('returns true when a valid string with only alphanumerical characters are input', () => {
    expect(validateUser('Matthew')).to.equal(true);
    expect(validateUser('StarLord2001')).to.equal(true);
    expect(validateUser('PepeTheFrong')).to.equal(true);
    expect(validateUser('1288Winner')).to.equal(true);
  });
  it('returns false when illegal charachers are input', () => {
    expect(validateUser('Real user ^^')).to.equal(false);
    expect(validateUser('?%*')).to.equal(false);
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

describe('formatLocation', () => {
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

describe('validateURL', () => {
  it('returns false when an empty url is passed in', () => {
    expect(validateURL('')).to.equal(false);
  });
  it('returns true when passed a valid url', () => {
    expect(validateURL('https://www.google.com')).to.equal(true);
    expect(validateURL('http://www.google.com')).to.equal(true);
    expect(validateURL('www.google.com')).to.equal(true);
    expect(validateURL('http://google.co')).to.equal(true);
  });
  it('returns false when passed an invalid url', () => {
    expect(validateURL('go.co')).to.equal(false);
    expect(validateURL('random-domain.com')).to.equal(false);
    expect(validateURL('www."NOT-GOOD-WEBSITE".com')).to.equal(false);
  });
});

describe('validateAuthorUUID', () => {
  it('return false when an empty string is passed', () => {
    expect(validateAuthorUUID('')).to.equal(false);
  });
  it('returns true when a valid uuid is passed in', () => {
    let uuid = '3c9f50cb-da22-4a7d-b105-246b6f14abf4';
    expect(validateAuthorUUID(uuid)).to.equal(true);
    uuid = 'fa0963c2-ec9f-4180-9256-0bd756114e90';
    expect(validateAuthorUUID(uuid)).to.equal(true);
    uuid = 'a0b560a4-7d4c-43e1-a094-1d3528ef710f';
    expect(validateAuthorUUID(uuid)).to.equal(true);
  });
  it('returns false when an invalid uuid is passed in', () => {
    let uuid = '3c-da22-4a7d-b105-246b6f14abf4';
    expect(validateAuthorUUID(uuid)).to.equal(false);
    uuid = 'fa0963c2-ec9f-4180-9256';
    expect(validateAuthorUUID(uuid)).to.equal(false);
  });
});
