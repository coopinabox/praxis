"use strict";

var fs = require('fs');
var $ = require('jquery/dist/jquery')(window);
require('bootstrap/dist/js/bootstrap');
var React = require('react');

var bb = require('bb');

var TasksRouter = require('tasks-client');
var HeaderView = require('header-client/HeaderView');

$(function() {

  // setup header
  React.renderComponent(
    new HeaderView(),
    document.querySelector('header')
  );

  // show version in title
  document.title = require('utils').version;

  new TasksRouter();
  bb.history.start();
});
