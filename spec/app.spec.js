process.env.NODE_ENV = 'test';

const { expect } = require('chai');
const request = require('supertest');

const app = require('../app');
const connection = require('../db/connection');

describe('app.js', () => {
  // Setup for tests
  beforeEach(() => {
    return connection.seed.run();
  });
  after(() => {
    return connection.destroy();
  });
  describe('/api', () => {
    describe('/auth/signup', () => {
      it('POST:201, creates a new user and serves up new user', () => {
        const postRequest = {
          user_id: 'b7bc7fd4-060a-4bb0-a3da-d0f98c0szf92k',
          first_name: 'Fred',
          last_name: 'Potter',
          username: 'FreddieStar',
          email: 'freddie@gmail.com'
        };

        return request(app)
          .post('/api/auth/signup')
          .send(postRequest)
          .expect(201)
          .then(({ body: { user } }) => {
            expect(user).to.have.keys(['user_id', 'first_name', 'last_name', 'username', 'email', 'created_at']);
          });
      });
      describe('ERRORS /api/auth/signup', () => {
        it('POST:400, when user_id already exists', () => {
          const postRequest = {
            user_id: 'b7bc7fd4-060a-4bb0-a3da-d0f98c06fd75',
            first_name: 'Delphine',
            last_name: 'Hansen',
            username: 'Allie61',
            email: 'Liliane.Koch71@hotmail.com'
          };

          return request(app)
            .post('/api/auth/signup')
            .send(postRequest)
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('duplicate key value violates unique constraint "users_pkey"');
            });
        });
        it('STATUS:405, when use attempts an invalid method', () => {
          const invalidMethods = ['get', 'put', 'patch', 'delete'];

          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]('/api/auth/signup')
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('method not allowed');
              });
          });

          return Promise.all(methodPromises);
        });
      });
    });
    describe('/users', () => {
      describe('/:username', () => {
        it('GET:200, returns a user by their username', () => {
          return request(app)
            .get('/api/users/Christiana74')
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user).to.have.keys(['user_id', 'first_name', 'last_name', 'username', 'email', 'created_at']);
              expect(user.username).to.equal('Christiana74');
            });
        });
        it('PATCH:200, updates user by username and serves up user.', () => {
          const patchRequest = {
            first_name: 'newfirstname',
            last_name: 'newlastname',
            email: 'newemail@email.com'
          };

          return request(app)
            .patch('/api/users/Christiana74')
            .send(patchRequest)
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user.username).to.equal('Christiana74');
              expect(user.first_name).to.equal('newfirstname');
              expect(user.last_name).to.equal('newlastname');
              expect(user.email).to.equal('newemail@email.com');
            });
        });
        it.only('DELETE:204, removes user by their username', () => {
          return request(app)
            .delete('/api/users/Christiana74')
            .expect(204);
        });
        describe('ERRORS /users:/:username', () => {
          it('GET:400, when username input is not valid', () => {
            return request(app)
              .get('/api/users/c9"INSERT"goal')
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Invalid input for username. Please only use alphanumeric characters.');
              });
          });
          it('GET:404, when username is valid but not found', () => {
            return request(app)
              .get('/api/users/notreallyauser')
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('User can not be found');
              });
          });
          it('PATCH:400, when username is invalid', () => {
            const patchRequest = {
              first_name: 'newfirstname',
              last_name: 'newlastname',
              email: 'newemail@email.com'
            };

            return request(app)
              .patch('/api/users/User"INSERT NEW DATA"HERE')
              .send(patchRequest)
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Invalid input for username. Please only use alphanumeric characters.');
              });
          });
          it('PATCH:400, when input data is invalid', () => {
            const patchRequest = {
              first_name: 'myn@m3!$',
              last_name: 'newlastname',
              email: 'newemail@email.com'
            };

            return request(app)
              .patch('/api/users/Christiana74')
              .send(patchRequest)
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Invalid input in form fields. Please only use alphanumeric characters.');
              });
          });
          it('PATCH:404, when user is not found but inputs are valid', () => {
            const patchRequest = {
              first_name: 'Pete',
              last_name: 'Chan',
              email: 'PeteChan@gmail.com'
            };

            return request(app)
              .patch('/api/users/Petechan1994')
              .send(patchRequest)
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('User can not be found');
              });
          });
          it('STATUS:405, when use attempts an invalid method', () => {
            const invalidMethods = ['post', 'put'];

            const methodPromises = invalidMethods.map(method => {
              return request(app)
                [method]('/api/users/Christiana74')
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('method not allowed');
                });
            });

            return Promise.all(methodPromises);
          });
        });
      });
    });
  });
});
