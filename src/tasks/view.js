var Ractive = require('ractive');
require('ractive-backbone');
var validation = require('backbone-validation');

var fs = require('fs');

module.exports = function (tasks, el) {
  var taskView = new Ractive({
    el: el,
    template: fs.readFileSync(__dirname + '/template.html'),
    adaptors: ['Backbone'],
    data: {
      tasks: tasks,
    },
    lazy: true,
  });
  taskView.on('create', function (event) {
    var task = tasks.create({});
    console.log("task create", task);
  });
  taskView.on('remove', function (event) {
    tasks.get(event.context).destroy();
  });
  // bind view to collection
  validation.bind(taskView, {
    collection: tasks,
  });
  return taskView;
};
