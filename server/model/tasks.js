var bookshelf = require('bookshelf');
var promise = require('bluebird');
var validator = require('checkit');

var Bookshelf = bookshelf.initialize({
  client: 'sqlite3',
  connection: {
    filename: "./db.sqlite",
  },
});

// initialize tasks schema
var table = Bookshelf.knex.schema.hasTable('tasks').then(function(exists) {
  if (!exists) {
    return Bookshelf.knex.schema.createTable('tasks', function (t) {
      t.increments('id').primary();
      t.string('name', 100);
      t.text('description');
    });
  } else {
    return Bookshelf.knex.schema.table('tasks', function (t) {

    });
  }
});

var Model = module.exports.Model = Bookshelf.Model.extend({
  tableName: 'tasks',
});

var Collection = module.exports.Collection = Bookshelf.Collection.extend({
  model: Model,
});

var collection = module.exports.collection = new Collection();
table.then(function() { collection.fetch(); });

var validate = module.exports.validate = function (task) {

  var defer = promise.defer();

  validator(task).run({
    'name'     : ['maxLength:10'],//['required', 'maxLength:100'],
    'description' : [],//['required'],
  }).then(function(validator) {
    defer.fulfill(validator);
  }, function(err) {
    defer.reject(err.checkit.errors);
  });

  return defer.promise;
};

var hash = require('es-hash');
var decycle = require('cycle').decycle;

module.exports.make = function (des, chan, ss) {
  return {
    poll: function (where) {
      var obj = {
        hash: hash(decycle(collection.models)),
        models: collection.models,
      };
      chan(obj);
    },
  };
};
