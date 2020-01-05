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
    describe('/reviews', () => {
      describe('/', () => {
        it('POST:201, creates a new review for a location ', () => {
          const postRequest = {
            review_title: 'Iste rem ut temporibus aut magni consectetur sunt nihil aliquam.',
            review_body:
              'Quia ea facere in commodi voluptatem corporis expedita. Odio incidunt aspernatur asperiores. Sequi consequatur et voluptates enim neque deleniti accusantium corrupti animi. Reiciendis sunt quaerat perferendis.',
            image_url: 'http://lorempixel.com/400/400/city/',
            author: '3c9f50cb-da22-4a7d-b105-246b6f14abf4',
            location_id: 15
          };

          return request(app)
            .post('/api/reviews')
            .send(postRequest)
            .expect(201)
            .then(({ body: { review } }) => {
              expect(review).to.have.keys([
                'review_id',
                'review_title',
                'review_body',
                'image_url',
                'vote_count',
                'author',
                'location_id',
                'created_at'
              ]);
            });
        });
        describe('ERRORS /api/reviews', () => {
          it('POST:400, when any of the data is invalid', () => {
            const postRequest = {
              review_title: '!@@#$%$#%TR&**^&*',
              review_body: 'Quia ea facere.',
              image_url: 'http://lorempixel.com/400/400/city/',
              author: '3c9f50cb-da22-4a7d-b105-246b6f14abf4',
              location_id: 15
            };

            return request(app)
              .post('/api/reviews')
              .send(postRequest)
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal(
                  'Some data is invalid, only alphanumeric characters and the following special characters are valid .,&$\'" '
                );
              });
          });
          it('POST:404, if location does not exist in the db', () => {
            const postRequest = {
              review_title: 'A very valid sentence',
              review_body: 'Quia ea facere.',
              image_url: 'http://lorempixel.com/400/400/city/',
              author: '3c9f50cb-da22-4a7d-b105-246b6f14abf4',
              location_id: 350
            };

            return request(app)
              .post('/api/reviews')
              .send(postRequest)
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal(
                  'insert or update on table "reviews" violates foreign key constraint "reviews_location_id_foreign"'
                );
              });
          });
          it('STATUS:405, when use attempts an invalid method', () => {
            const invalidMethods = ['put', 'delete', 'patch', 'get'];

            const methodPromises = invalidMethods.map(method => {
              return request(app)
                [method]('/api/reviews')
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('method not allowed');
                });
            });

            return Promise.all(methodPromises);
          });
        });
      });
      describe('/:review_id', () => {
        it('PATCH:200, updates the review title and/or review body', () => {
          const patchReq = {
            review_title: 'An amazing city with brilliant views',
            review_body: 'More information about the city.'
          };

          return request(app)
            .patch('/api/reviews/1')
            .send(patchReq)
            .expect(200)
            .then(({ body: { review } }) => {
              expect(review.review_title).to.equal(patchReq.review_title);
              expect(review.review_body).to.equal(patchReq.review_body);
              expect(review).to.have.keys([
                'review_id',
                'review_title',
                'review_body',
                'image_url',
                'vote_count',
                'author',
                'location_id',
                'created_at'
              ]);
            });
        });
        it('DELETE:204, remove a review by its ID', () => {
          return request(app)
            .delete('/api/reviews/5')
            .expect(204);
        });
      });
      describe('ERRORS /api/reviews/:review_id', () => {
        it('PATCH:400, when data contains invalid characters', () => {
          const patchReq = {
            review_title: 'An ##*!!$#^``brilliant views',
            review_body: 'More information about the city.'
          };

          return request(app)
            .patch('/api/reviews/1')
            .send(patchReq)
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Title or body contains invalid characters.');
            });
        });
        it('PATCH:404, when review_id does not exist', () => {
          const patchReq = {
            review_title: 'An amazingly brilliant view',
            review_body: 'More information about the city.'
          };

          return request(app)
            .patch('/api/reviews/2000')
            .send(patchReq)
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Review does not exist.');
            });
        });
        it('DELETE:400, when the review_id is invalid', () => {
          return request(app)
            .delete('/api/reviews/not-a-real-id')
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Please enter a valid review_id');
            });
        });
        it('DELETE:404, when a valid review_id is not found in DB', () => {
          return request(app)
            .delete('/api/reviews/9999')
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Review not found');
            });
        });
        it('STATUS:405, when use attempts an invalid method', () => {
          const invalidMethods = ['put', 'post', 'get'];

          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]('/api/reviews/1')
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('method not allowed');
              });
          });

          return Promise.all(methodPromises);
        });
      });
      describe('/comments', () => {
        it('GET:200, returns an array of comments for a review', () => {
          return request(app)
            .get('/api/reviews/18/comments')
            .expect(200)
            .then(({ body: { comments } }) => {
              expect(comments).to.be.an('array');
            });
        });
        it('GET:200, each comment has the relevant keys', () => {
          return request(app)
            .get('/api/reviews/18/comments')
            .expect(200)
            .then(({ body: { comments } }) => {
              comments.forEach(comment => {
                expect(comment).to.have.keys(['comment_id', 'comment_body', 'review_id', 'author', 'created_at']);
                expect(comment.review_id).to.equal(18);
              });
            });
        });
        it('POST:201, creates a new comment for a review', () => {
          const postRequest = {
            comment_body: 'Wow. Looks amazing.',
            author: 'a0b560a4-7d4c-43e1-a094-1d3528ef710f'
          };

          return request(app)
            .post('/api/reviews/1/comments')
            .send(postRequest)
            .expect(201)
            .then(({ body: { comment } }) => {
              expect(comment).to.have.keys(['comment_id', 'comment_body', 'review_id', 'author', 'created_at']);
              expect(comment.comment_body).to.equal('Wow. Looks amazing.');
              expect(comment.author).to.equal('a0b560a4-7d4c-43e1-a094-1d3528ef710f');
              expect(comment.review_id).to.equal(1);
            });
        });
        describe('ERRORS /api/reviews/:review_id/comments', () => {
          it('GET:400, when review_id is invalid', () => {
            return request(app)
              .get('/api/reviews/not-a-num/comments')
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Please enter a valid review_id');
              });
          });
          it('GET:404, when review_id is valid but not found', () => {
            return request(app)
              .get('/api/reviews/9000/comments')
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Review not found');
              });
          });
          it('POST:400, when comment body is invalid', () => {
            const postRequest = {
              comment_body: 'Wow. L@@ks amaz***.',
              author: 'a0b560a4-7d4c-43e1-a094-1d3528ef710f'
            };

            return request(app)
              .post('/api/reviews/1/comments')
              .send(postRequest)
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Invalid characters in the comment_body or author uuid not valid.');
              });
          });
          it('POST:400, when the UUID is not valid.', () => {
            const postRequest = {
              comment_body: 'Wow. Looks amazing.',
              author: 'a0b560a4-1d3528ef710f'
            };

            return request(app)
              .post('/api/reviews/1/comments')
              .send(postRequest)
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Invalid characters in the comment_body or author uuid not valid.');
              });
          });
          it('STATUS:405, when use attempts an invalid method', () => {
            const invalidMethods = ['put', 'patch', 'delete'];

            const methodPromises = invalidMethods.map(method => {
              return request(app)
                [method]('/api/reviews/1/comments')
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
    describe('/locations', () => {
      describe('/', () => {
        it('GET:200, returns an array of all locations', () => {
          return request(app)
            .get('/api/locations')
            .expect(200)
            .then(({ body: { locations } }) => {
              expect(locations).to.be.an('array');
              locations.forEach(location => {
                expect(location).to.have.keys(['location_id', 'city', 'country', 'continent']);
              });
            });
        });
        it('GET:200, returns a filtered array based on continent, which has not default', () => {
          return request(app)
            .get('/api/locations?continent=europe')
            .expect(200)
            .then(({ body: { locations } }) => {
              locations.forEach(location => {
                expect(location['continent']).to.equal('Europe');
              });
            });
        });
        it('POST:201, adds a new location to DB if does not already exist then serves up new locations', () => {
          const postRequest = {
            city: 'Liverpool',
            country: 'United Kingdom',
            continent: 'Europe'
          };

          return request(app)
            .post('/api/locations')
            .send(postRequest)
            .expect(201)
            .then(({ body: { location } }) => {
              expect(location).to.eql({ ...postRequest, location_id: 21 });
            });
        });
        it('POST:201, adds a new location to DB in the correct format', () => {
          const postRequest = {
            city: 'liveRPooL',
            country: 'uNITED kiNGdom',
            continent: 'Europe'
          };

          const expecgtedResult = {
            location_id: 21,
            city: 'Liverpool',
            country: 'United Kingdom',
            continent: 'Europe'
          };

          return request(app)
            .post('/api/locations')
            .send(postRequest)
            .expect(201)
            .then(({ body: { location } }) => {
              expect(location).to.eql(expecgtedResult);
            });
        });
      });
      describe('ERRORS /api/locations', () => {
        it('GET:200, returns unfiltered array if query is invalid in any way', () => {
          return request(app)
            .get('/api/locations?continent=BADREQUEST')
            .expect(200)
            .then(({ body: { locations } }) => {
              expect(locations).to.have.lengthOf(20);
            });
        });
        it('POST:400, when any data is not valid', () => {
          const postRequest = {
            city: 'Liverp@@l',
            country: 'United Kingdom',
            continent: 'Europe'
          };

          return request(app)
            .post('/api/locations')
            .send(postRequest)
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Please only input alphanumeric characters and spaces.');
            });
        });
        it('POST:400, when data is missing', () => {
          const postRequest = {
            city: 'Liverpool'
          };

          return request(app)
            .post('/api/locations')
            .send(postRequest)
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Missing data - Please include a city, country and continent.');
            });
        });
        it('POST:400, when the location already exists in the db', () => {
          const postRequest = {
            city: 'Hue',
            country: 'Vietnam',
            continent: 'Asia'
          };

          return request(app)
            .post('/api/locations')
            .send(postRequest)
            .expect(400)
            .then(({ body: { msg, location_id } }) => {
              expect(location_id).to.equal(18);
              expect(msg).to.equal('Location already exists.');
            });
        });
        it('STATUS:405, when use attempts an invalid method', () => {
          const invalidMethods = ['put', 'delete', 'patch'];

          const methodPromises = invalidMethods.map(method => {
            return request(app)
              [method]('/api/locations')
              .expect(405)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('method not allowed');
              });
          });

          return Promise.all(methodPromises);
        });
        describe('/:location_id/reviews', () => {
          it('GET:200, returns an array of reviews based on a given location', () => {
            return request(app)
              .get('/api/locations/18/reviews')
              .expect(200)
              .then(({ body: { reviews } }) => {
                expect(reviews).to.be.an('array');
              });
          });
          it('GET:200, each review has the relevant keys', () => {
            return request(app)
              .get('/api/locations/18/reviews')
              .expect(200)
              .then(({ body: { reviews } }) => {
                reviews.forEach(review => {
                  expect(review).to.have.keys([
                    'review_id',
                    'review_title',
                    'review_body',
                    'created_at',
                    'vote_count',
                    'author',
                    'image_url',
                    'location_id'
                  ]);
                });
              });
          });
          it('GET:200, returns reviews for the correct location_id', () => {
            return request(app)
              .get('/api/locations/18/reviews')
              .expect(200)
              .then(({ body: { reviews } }) => {
                reviews.forEach(review => {
                  expect(review.location_id).to.equal(18);
                });
              });
          });
          describe('ERRORS /api/locations/:location_id/reviews', () => {
            it('GET:400, when location_id is not valid', () => {
              return request(app)
                .get('/api/locations/not-a-num/reviews')
                .expect(400)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('Please enter a valid location_id');
                });
            });
            it('GET:404, when location_id is valid but not found', () => {
              return request(app)
                .get('/api/locations/500/reviews')
                .expect(404)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('Location_id does not exist');
                });
            });
            it('STATUS:405, when use attempts an invalid method', () => {
              const invalidMethods = ['post', 'put', 'delete', 'patch'];

              const methodPromises = invalidMethods.map(method => {
                return request(app)
                  [method]('/api/locations/1/reviews')
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
    describe('/users', () => {
      describe('/', () => {
        it('GET:200, returns all users in the database', () => {
          return request(app)
            .get('/api/users')
            .expect(200)
            .then(
              ({
                body: {
                  userData: { users }
                }
              }) => {
                expect(users).to.be.an('array');
                users.forEach(user => {
                  expect(user).to.have.keys(['user_id', 'first_name', 'last_name', 'username', 'email', 'created_at']);
                });
              }
            );
        });
        it('GET:200, returns a totol count of all users', () => {
          return request(app)
            .get('/api/users')
            .expect(200)
            .then(({ body: { userData } }) => {
              expect(userData).to.have.key(['total_users', 'users']);
            });
        });
        it('GET:200, returns a limited list of users with default of 5', () => {
          return request(app)
            .get('/api/users?limit=7')
            .expect(200)
            .then(
              ({
                body: {
                  userData: { users }
                }
              }) => {
                expect(users).to.have.lengthOf(7);
              }
            );
        });
        describe('ERRORS /api/users', () => {
          it('GET:200, returns all users if limit query is invalid, i.e. not a digit', () => {
            return request(app)
              .get('/api/users?limit=9chan')
              .expect(200)
              .then(
                ({
                  body: {
                    userData: { users }
                  }
                }) => {
                  expect(users).to.have.lengthOf(10);
                }
              );
          });
          it('STATUS:405, when use attempts an invalid method', () => {
            const invalidMethods = ['post', 'put', 'delete', 'patch'];

            const methodPromises = invalidMethods.map(method => {
              return request(app)
                [method]('/api/users')
                .expect(405)
                .then(({ body: { msg } }) => {
                  expect(msg).to.equal('method not allowed');
                });
            });

            return Promise.all(methodPromises);
          });
        });
      });
      describe('/:username', () => {
        it('GET:200, returns a user by their user_id', () => {
          return request(app)
            .get('/api/users/e40e752a-3230-4758-a118-b7f3537c1fd8')
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user).to.have.keys(['user_id', 'first_name', 'last_name', 'username', 'email', 'created_at']);
              expect(user.username).to.equal('Christiana74');
            });
        });
        it('PATCH:200, updates user by user_id and serves up user.', () => {
          const patchRequest = {
            first_name: 'newfirstname',
            last_name: 'newlastname',
            email: 'newemail@email.com'
          };

          return request(app)
            .patch('/api/users/e40e752a-3230-4758-a118-b7f3537c1fd8')
            .send(patchRequest)
            .expect(200)
            .then(({ body: { user } }) => {
              expect(user.user_id).to.equal('e40e752a-3230-4758-a118-b7f3537c1fd8');
              expect(user.username).to.equal('Christiana74');
              expect(user.first_name).to.equal('newfirstname');
              expect(user.last_name).to.equal('newlastname');
              expect(user.email).to.equal('newemail@email.com');
            });
        });
        it('DELETE:204, removes user by their user_id', () => {
          return request(app)
            .delete('/api/users/e40e752a-3230-4758-a118-b7f3537c1fd8')
            .expect(204)
            .then(() => {
              return request(app)
                .get('/api/users/e40e752a-3230-4758-a118-b7f3537c1fd8')
                .expect(404);
            });
        });
        describe('ERRORS /users:/:username', () => {
          it('GET:400, when username input is not valid', () => {
            return request(app)
              .get('/api/users/c9"INSERT"goal')
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Invalid input for user_id.');
              });
          });
          it('GET:404, when username is valid but not found', () => {
            return request(app)
              .get('/api/users/e40e752e-3230-4758-a118-b7f3537c1fd8')
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
              .patch('/api/users/UserIDNotValid!!!!')
              .send(patchRequest)
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Invalid input for user_id.');
              });
          });
          it('PATCH:400, when input data is invalid', () => {
            const patchRequest = {
              first_name: 'myn@m3!$',
              last_name: 'newlastname',
              email: 'newemail@email.com'
            };

            return request(app)
              .patch('/api/users/e40e752e-3230-4758-a118-b7f3537c1fd8')
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
              .patch('/api/users/e40e752d-3230-4758-a118-b7f3537c1fd8')
              .send(patchRequest)
              .expect(404)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('User can not be found');
              });
          });
          it('POST:400, when username is invalid', () => {
            return request(app)
              .delete('/api/users/$$$NOTUSER$$$')
              .expect(400)
              .then(({ body: { msg } }) => {
                expect(msg).to.equal('Invalid input for user_id.');
              });
          });
          it('POST:404, when a valid username does not exist', () => {
            return request(app)
              .delete('/api/users/e40e752d-3230-4758-a118-b7f3537c1fd8')
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
    describe('/comments/:comment_id', () => {
      it('DELETE:204, removes comment from database by its ID.', () => {
        return request(app)
          .delete('/api/comments/2')
          .expect(204);
      });
      describe('ERRORS /api/comments/:comment_id', () => {
        it('DELETE:400, when the comment_id is invalid', () => {
          return request(app)
            .delete('/api/comments/not-a-num')
            .expect(400)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Comment ID must be a number');
            });
        });
        it('DELETE:404, when the comment does not exist', () => {
          return request(app)
            .delete('/api/comments/20000')
            .expect(404)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('Comment can not be found.');
            });
        });
      });
    });
  });
});
