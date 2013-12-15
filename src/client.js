// attach global jquery to backbone
require('backbone').$ = $;

// add validation to backbone
var bb = require('backbone');
var validation = require('backbone-validation');
var _ = require('underscore');
_.extend(bb.Model.prototype, validation.mixin);

var fs = require('fs');
var headerHtml = fs.readFileSync(__dirname + '/index.header.html');
$('body > header').html(headerHtml);

var Tasks = require('./tasks/collection.client');
var tasks = new Tasks();
var TasksView = require('./tasks/view');
var tasksView = TasksView(tasks, '#tasks');
