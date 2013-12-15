"use strict";

var Collection = require('./collection.server');

module.exports = {

  setup: function (app) {
    this.collection = new Collection();
  },

  find: function (params, cb) {
    cb(null, this.collection.toJSON());
  },

  get: function(id, params, cb) {
    cb(null, this.collection.get(id).toJSON());
  },

  create: function (data, params, cb) {
    this.collection.create(data, params)
      .then(function (model) {
        cb(null, model);
      }, function (err) {
        cb(err);
      });
  },

  update: function (id, data, params, cb) {
    this.collection.get(id)
      .save(data, { patch: true })
      .then(function (model) {
        cb(null, model);
      }, function (err) {
        cb(err);
      });
  },

  remove: function (id, params, cb) {
    this.collection.remove(
      this.collection.get(id)
    ).destroy().then(function (result) {
      cb();
    }, function (err) {
      cb(err);
    });
  },
};
