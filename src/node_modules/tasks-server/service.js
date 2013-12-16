"use strict";

var TaskList = require('./TaskList');

module.exports = {

  setup: function (app) {
    this.taskList = new TaskList();
  },

  find: function (params, cb) {
    cb(null, this.taskList.toJSON());
  },

  get: function(id, params, cb) {
    cb(null, this.taskList.get(id).toJSON());
  },

  create: function (data, params, cb) {
    this.taskList.create(data, params)
      .then(function (model) {
        cb(null, model);
      }, function (err) {
        cb(err);
      });
  },

  update: function (id, data, params, cb) {
    this.taskList.get(id)
      .save(data, { patch: true })
      .then(function (model) {
        cb(null, model);
      }, function (err) {
        cb(err);
      });
  },

  remove: function (id, params, cb) {
    this.taskList.remove(
      this.taskList.get(id)
    ).destroy().then(function (result) {
      cb();
    }, function (err) {
      cb(err);
    });
  },
};
