"use strict";

exports.up = function(knex, Promise) {
  return knex.schema.createTable('edges', function (t) {
    t.increments().primary();
    t.integer('sourceId');
    t.integer('targetId');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('edges');
};
