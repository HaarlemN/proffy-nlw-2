import Knex from 'knex';

export async function up(knex: Knex) {
  // CREATE TABLE
  return knex.schema.createTableIfNotExists('connections', (table) => {
    table.increments('id').primary();
    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.timestamp('created_at')
      .defaultTo('now()')
      .notNullable();
  });
}

export async function down(knex: Knex) {
  // DROP TABLE
  return knex.schema.dropTableIfExists('connections');
}
