var feathers = require('feathers');
var ecstatic = require('ecstatic');

var isProd = (process.env.NODE_ENV === 'production')

var app = feathers()
  .configure(feathers.socketio())
  .use('/tasks', require('./tasks/service'))
  .use(ecstatic({
    root: __dirname + '/../static',
    cache: (isProd ? 3600 : 0),
  }))
  .listen(5000);

module.exports = app;
