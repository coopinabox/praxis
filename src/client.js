"use strict";

var $ = require('jquery/dist/jquery')(window);
require('bootstrap/dist/js/bootstrap');

var fs = require('fs');

$(function() {

  var React = require('react');

  // setup header
  $('body').append(
      '<header>' +
        fs.readFileSync(__dirname + '/index.header.html') +
      '</header>'
      );

  // setup main with tasks element
  $('body').append(
      '<main>' +
        '<div class="tasks"></div>' +
      '</main>'
      );

  // show version in title and brand
  var version = require('../package.json').version;
  $('head > title').text(version);
  $('.brand').text(version);

  var TaskList = require('tasks-client/TaskList');
  var taskList = new TaskList();
  var TaskListView = require('tasks-client/TaskListView');
  var taskListView = TaskListView({ model: taskList });
  React.renderComponent(taskListView, document.querySelector('.tasks'));
});
