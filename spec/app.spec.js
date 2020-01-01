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
          .get('/api/auth/signup')
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
            .get('/api/auth/signup')
            .send(postRequest)
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('duplicate key value violates unique constraint "users_pkey"');
            });
        });
      });
    });
  });
});
