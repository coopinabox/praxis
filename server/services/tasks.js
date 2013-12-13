var bookshelf = require('bookshelf');
var promise = require('bluebird');

var validate = require('../../shared/models/task').validate

var Bookshelf = bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    filename: "./db.sqlite",
  },
});

// initialize tasks schema
Bookshelf.knex.schema.hasTable('tasks').then(function(exists) {
  if (!exists) {
    return Bookshelf.knex.schema.createTable('tasks', function (t) {
      t.increments('id').primary();
      t.string('name', 100);
      t.text('description');
    });
  }
});

var Model = Bookshelf.Model.extend({
  tableName: 'tasks',
});

var Collection = Bookshelf.Collection.extend({
  model: Model,
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
          cb(model);
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
