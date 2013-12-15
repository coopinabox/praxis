// attach global jquery to backbone
require('backbone').$ = $;

var fs = require('fs');

var Tasks = require('./tasks/collection.client');
var tasks = new Tasks();
var TasksView = require('./tasks/view');
var tasksView = TasksView(tasks, '#tasks');
