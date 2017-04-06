'use strict';

exports.up = (knex, Promise) => {
  return knex.schema.createTable('orders', (table) => {
    table.increments(); // same as (`id` int unsigned not null auto_increment primary key)
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable();
    table.string('size').notNullable();
    table.specificType('toppings', knex.raw('text[]')).notNullable().defaultTo('{"cheese"}');
  });
};

exports.down = (knex, Promise) => knex.schema.dropTable('orders')
