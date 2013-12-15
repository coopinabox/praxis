// attach global jquery to backbone
require('backbone').$ = $;

var fs = require('fs');
var headerHtml = fs.readFileSync(__dirname + '/index.header.html');
$('body > header').html(headerHtml);

var Tasks = require('./tasks/collection.client');
var tasks = new Tasks();
var TasksView = require('./tasks/collection-view');
var tasksView = TasksView(tasks, '.tasks');
