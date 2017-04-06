'use strict';

exports.up = (knex, Promise) => {
  return knex.schema.createTable('sizes', (table) => {
    table.increments();
    table.string('name').notNullable().unique();
    table.integer('inches').notNullable();
  });
};

exports.down = (knex, Promise) => knex.schema.dropTable('sizes')
