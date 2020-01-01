const ENV = process.env.NODE_ENV || 'development';
const knex = require('knex');
const dbConfig =
  ENV === 'production' ? { client: 'mysql', connection: process.env.DATABASE_URL } : require('../knexfile');

module.exports = knex(dbConfig);
