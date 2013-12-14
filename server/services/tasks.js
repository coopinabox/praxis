var promise = require('bluebird');

var validate = require('../../shared/models/task').validate
var db = require('../db');

var Model = db.Model.extend({
  tableName: 'tasks',
});

var Collection = db.Collection.extend({
  model: Model,
  initialize: function () {
    this.fetch();
  },
});

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
    var self = this;
    validate(data).then(function () {
      self.collection.create(data, params)
        .then(function (model) {
          cb(null, model);
        }, function (err) {
          throw err;
        });
    }, function (errors) {
      cb(errors);
    });
  },

  update: function (id, data, params, cb) {
    var self = this;
    validate(data).then(function () {
      self.collection.get(id)
        .save(data, { patch: true })
        .then(function (model) {
          cb(null, model);
        }, function (err) {
          throw err;
        });
    }, function (errors) {
      cb(errors);
    });
  },

  remove: function (id, params, cb) {
    this.collection.remove(
      this.collection.get(id)
    ).destroy().then(function (result) {
      cb();
    }, function (err) {
      throw err;
    });
  },

}
