exports.up = function(knex) {
  return knex.schema.createTable('reviews', reviewsTable => {
    reviewsTable.increments('review_id').primary();
    reviewsTable.string('review_title').notNullable();
    reviewsTable.text('review_body').notNullable();
    reviewsTable.string('image_url').notNullable();
    reviewsTable.integer('vote_count').defaultTo(0);
    reviewsTable
      .string('author')
      .references('users.user_id')
      .notNullable();
    reviewsTable
      .integer('location_id')
      .references('locations.location_id')
      .notNullable();
    reviewsTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('reviews');
};
