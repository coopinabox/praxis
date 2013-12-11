var bookshelf = require('bookshelf');
var promise = require('bluebird');
var tv4 = require('tv4');

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

var schema = {
  id: 'task',
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
}
tv4.addSchema(schema);

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
  var validation = tv4.validateMultiple(req.body, schema, true);
  if (validation.valid) {
    collection.create(req.body, {})
      .then(function (model) {
        res.json(201, model);
      }, function (err) {
        return next(err);
      });
  } else {
    if (validation.missing.length > 0) {
      throw new Error("missing validation schema");
    }
    res.json(400, validation.errors);
  }
};

module.exports.update = function (req, res) {
  var validation = tv4.validateMultiple(req.body, schema, true);
  if (validation.valid) {
    collection.get(req.params.id)
      .save(req.body, { patch: true })
      .then(function (model) {
        res.json(200, model);
      }, function (err) {
        return next(err);
      });
  } else {
    if (validation.missing.length > 0) {
      throw new Error("missing validation schema");
    }
    res.json(400, validation.errors);
  }
};

module.exports.remove = function (req, res) {
  collection.remove(
    collection.get(req.params.id)
  ).destroy().then(function (result) {
    res.send(204);
  }, function (err) {
    return next(err);
  });
};
