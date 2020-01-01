const { userData, locationData, commentData, reviewData } = require('../data');

exports.seed = function(knex) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      const usersInsertions = knex('users')
        .insert(userData)
        .returning('*');

      const locationsInsertion = knex('locations')
        .insert(locationData)
        .returning('*');

      return Promise.all(usersInsertions, locationsInsertion);
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
