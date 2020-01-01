exports.up = function(knex) {
  return knex.schema.createTable('locations', locationsTable => {
    locationsTable.increments('location_id').primary();
    locationsTable.string('city').notNullable();
    locationsTable.string('country').notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('locations');
};