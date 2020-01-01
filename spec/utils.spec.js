process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const { validateEmail } = require('../utils/utils');

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
