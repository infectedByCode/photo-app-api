exports.up = function(knex) {
  return knex.schema.createTable('comments', commentsTable => {
    commentsTable.increments('comment_id').primary();
    commentsTable.text('comment_body').notNullable();
    commentsTable
      .string('author')
      .references('users.user_id')
      .notNullable()
      .onDelete('cascade');
    commentsTable
      .integer('review_id')
      .references('reviews.review_id')
      .notNullable()
      .onDelete('cascade');

    commentsTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comments');
};
