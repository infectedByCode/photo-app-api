# Photo App API

## About

A backend API for a trip review application built using PostgreSQL, NodeJS and Express.

Users are able to:

- Singup and login with an email and password.
- Edit their name and username.
- View all locations reviewed.
- Search locations by city or country name.
- Post a new review to an existing or non-exisitng location. If the location is non-existing, it will be created.
- Edit their reviews when view a location.
- Delete their reviews when viewing a location they have reviewed.

## Getting Started

Follow the below instructions for getting the project up and running on your local machine for development and testing purposes.

### Prerequisites

To be able to get the project up and running, you will need the following installed on your machine.

- [NodeJS](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [PostgreSQL (PSQL)](https://www.postgresql.org/)

### Cloning Project

Go to the root of the repository here.
Fork the repository to your GitHub account.
Once forked, you will be given a git link. Copy this link.
Open up a terminal on your local machine and type git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY and press Enter. Your local clone will then be created.

### Installing Packages

The following packages will be required to get the API working locally.

#### Production Packages

- cors
- express
- knex
- pg

#### Test Packages

- chai
- chai-sorted
- mocha
- supertest

To install all, type `npm install` and press Enter. The packages will be installed from the package.json.

### Setup databases

This project using [KnexJS](http://knexjs.org/). Due to this, a knexfile.js will need to be created in order for the project to work.

Inside the knexfile.js, type the following:

```
const { DB_URL } = process.env;
const ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
  client: 'pg',
  migrations: {
    directory: './db/migrations'
  },
  seeds: {
    directory: './db/seeds'
  }
};

const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: 'photo_app',
      username: 'LINUX ONLY YOUR USERNAME FOR PG',
      password: 'YOUR PASSWORD'
    }
  },
  test: {
    connection: {
      database: 'photo_app_test',
      username: 'LINUX ONLY YOUR USERNAME FOR PG',
      password: 'YOUR PASSWORD'
    }
  }
};

module.exports = { ...customConfig[ENV], ...baseConfig };

```

With the knexfile setup, you can create the databases on your machine.

To do this run the following:

`npm run setup-dbs`

Now the databases are setup, you can seed the data.

`npm run seed`

**_You should now be able to start adding to the project_**

### Testing

#### Util Tests

There are a number of util tests for the project, which can be added to by using the following format. The testing suite is Mocha / Chai.

**_Test example_**

```
describe('validateUser', () => {
  it('returns false when an empty string is passed in', () => {
    expect(validateUser('')).to.equal(false);
  });
});
```

To run the util test run `npm run test-util`

#### App Tests

Tests have been created for routes including any possible errors. Any additional routes should be tested in a similar way.

**_Test example_**

```
 describe('/:username', () => {
  it('GET:200, returns a user by their user_id', () => {
    return request(app)
      .get('/api/users/e40e752a-3230-4758-a118-b7f3537c1fd8')
      .expect(200)
      .then(({ body: { user } }) => {
        expect(user).to.have.keys(['user_id', 'first_name',     'last_name', 'username', 'email', 'created_at']);
        expect(user.username).to.equal('Christiana74');
      });
  });
 });
```

To run the app test run `npm run test-app`
