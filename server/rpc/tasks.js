var tasks = require('../model/tasks');

var collection = tasks.collection;
var validate = tasks.validate;

// return an object of CRUD actions that
// can be called on client with rpc(tasks.*

module.exports.actions = function (req, res, ss) {

  return {

    // return all tasks
    all: function () {
      res(null, collection.toJSON());
    },

    // create new task
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

    // get a task by id
    get: function (id) {
      res(null, collection.get(req.params.id).toJSON());
    },

    // update a task
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

    // delete a task by id
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




