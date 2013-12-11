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

var collection = new Collection();

module.exports.all = function (req, res) {
  res.json(collection.toJSON());
};

module.exports.get = function (req, res) {
  res.json(collection.get(req.params.id).toJSON());
};

module.exports.create = function (req, res, next) {
  validate(req.body).then(function () {
    collection.create(req.body, {})
      .then(function (model) {
        res.json(201, model);
      }, function (err) {
        next(err);
      });
  }, function (errors) {
    console.log(errors);
    res.json(400, errors);
  });
};

module.exports.update = function (req, res) {
  validate(req.body).then(function () {
    collection.get(req.params.id)
      .save(req.body, { patch: true })
      .then(function (model) {
        res.json(200, model);
      }, function (err) {
        next(err);
      });
  }, function (errors) {
    console.log(errors);
    res.json(400, errors);
  });
};

module.exports.remove = function (req, res) {
  collection.remove(
    collection.get(req.params.id)
  ).destroy().then(function (result) {
    res.send(204);
  }, function (err) {
    next(err);
  });
};
