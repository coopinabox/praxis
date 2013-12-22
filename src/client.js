"use strict";

var fs = require('fs');
var $ = require('jquery/dist/jquery')(window);
require('bootstrap/dist/js/bootstrap');

var bb = require('bb');

var TasksRouter = require('tasks-client/router');

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
      '</main>'
      );

  // show version in title and brand
  var version = require('../package.json').version;
  $('head > title').text(version);
  $('.brand').text(version);

  new TasksRouter();
  bb.history.start();
});
