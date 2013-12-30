"use strict";

exports.up = function(knex, Promise) {
  return knex.schema.createTable('vertexes', function (t) {
    t.increments().primary();
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('vertexes');
};
