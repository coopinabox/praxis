var feathers = require('feathers');

require('./validation.server');

var app = feathers()
  .configure(feathers.socketio())
  .use('/tasks', require('./tasks/service'))

//  .listen(5000);

module.exports = app;
