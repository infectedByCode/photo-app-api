const { userData, locationData, commentData, reviewData } = require('../data');

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex('users')
        .insert(userData)
        .returning('*');
    })
    .then(() => {
      return knex('locations')
        .insert(locationData)
        .returning('*');
    })
    .then(() => {
      return knex('reviews')
        .insert(reviewData)
        .returning('*');
    })
    .then(() => {
      return knex('comments')
        .insert(commentData)
        .returning('*');
    });
};
