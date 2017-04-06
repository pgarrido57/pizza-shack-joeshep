'use strict';

exports.up = (knex, Promise) => {
  return knex.schema.createTable('toppings', (table) => {
    table.increments(); // same as (`id` int unsigned not null auto_increment primary key)
    table.string('name').notNullable().unique();
  });
};

exports.down = (knex, Promise) => knex.schema.dropTable('toppings')
