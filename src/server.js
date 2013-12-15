var feathers = require('feathers');
var ecstatic = require('ecstatic');

var app = feathers()
  .configure(feathers.socketio())
  .use('/tasks', require('./tasks/service'))
  .use(ecstatic(__dirname + '/../static'))
  .listen(5000);

module.exports = app;
