"use strict";

var version = require('../package.json').version;

var $ = jQuery = require('jquery/dist/jquery')(window);
require('bootstrap/dist/js/bootstrap');
// attach jquery to backbone
require('backbone').$ = $;

var fs = require('fs');
var headerHtml = fs.readFileSync(__dirname + '/index.header.html');
$('head > title').text(version);
$('body > header').html(headerHtml);
$('.brand').text(version);

var TaskList = require('./tasks/TaskList.client');
var taskList = new TaskList();
var TaskListView = require('./tasks/TaskListView');
var taskListView = TaskListView(taskList, '.tasks');
