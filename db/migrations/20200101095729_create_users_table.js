exports.up = function(knex) {
  return knex.schema.createTable('users', usersTable => {
    usersTable.string('user_id').primary();
    usersTable.string('first_name');
    usersTable.string('last_name');
    usersTable
      .string('username')
      .unique()
      .notNullable();
    usersTable
      .string('email')
      .unique()
      .notNullable();
    usersTable.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
