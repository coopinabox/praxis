"use strict";

var Ractive = require('ractive');
require('ractive-backbone');
var validation = require('backbone-validation');

var fs = require('fs');

module.exports = function (tasks, el) {
  var taskView = new Ractive({
    el: el,
    template: fs.readFileSync(__dirname + '/collection.html'),
    adaptors: ['Backbone'],
    data: {
      tasks: tasks,
    },
  });
  taskView.on({
    // bind create
    create: function (event) {
      var task = tasks.create({});
      console.log("task create", task);
    },
    // bind destroy
    remove: function (event) {
      tasks.get(event.context).destroy();
    },
    // bind save
    modified: function (event) {
      tasks.get(event.context).save();
    },
  });
  // bind view to collection
  validation.bind(taskView, {
    collection: tasks,
  });
  return taskView;
};
