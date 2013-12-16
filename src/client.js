"use strict";

var $ = require('jquery/dist/jquery')(window);
require('bootstrap/dist/js/bootstrap');

var fs = require('fs');

$(function() {

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

  var TaskListView = require('tasks/TaskListView');
  var taskListView =  new TaskListView({ el: '.tasks' });
});
