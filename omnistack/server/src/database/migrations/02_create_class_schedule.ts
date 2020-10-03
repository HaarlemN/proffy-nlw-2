import Knex from 'knex';

export async function up(knex: Knex) {
  // CREATE TABLE
  return knex.schema.createTableIfNotExists('class_schedules', (table) => {
    table.increments('id').primary();
    table.integer('week_day').notNullable();
    table.integer('from').notNullable();
    table.integer('to').notNullable();
    /* Class relation */
    table.integer('class_id')
      .notNullable()
      .references('id')
      .inTable('classes')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.timestamps();
  }); 
}

export async function down(knex: Knex) {
  // DROP TABLE
  return knex.schema.dropTableIfExists('class_schedules');
}
