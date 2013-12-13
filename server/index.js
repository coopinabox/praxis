var feathers = require('feathers');

var app = feathers()
  .configure(feathers.socketio())
  .use('/tasks', require('./services/tasks'))

//  .listen(5000);

module.exports = app;
