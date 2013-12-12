var tasks = require('../model/tasks');

var collection = tasks.collection;
var validate = tasks.validate;

module.exports.actions = function (req, res, ss) {

  return {

    all: function () {
      res(null, collection.toJSON());
    },

    create: function (task) {
      validate(task).then(function () {
        collection.create(task, {})
          .then(function (model) {
            res(null, model);
          }, function (err) {
            throw err;
          });
      }, function (errors) {
        console.log(errors);
        res(errors);
      });
    },

    get: function (id) {
      res(null, collection.get(req.params.id).toJSON());
    },

    update: function (task) {
      validate(task).then(function () {
        collection.get(task.id)
          .save(task, { patch: true })
          .then(function (model) {
            res(null, model);
          }, function (err) {
            throw err;
          });
      }, function (errors) {
        console.log(errors);
        res(errors);
      });
    },

    delete: function (id) {
      collection.remove(
        collection.get(id)
      ).destroy().then(function (result) {
        res(true);
      }, function (err) {
        throw err;
      });
    },
  };
};




