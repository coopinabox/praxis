var feathers = require('feathers');

// add validation to bookshelf
var db = require('./db');
var validation = require('backbone-validation');
var _ = require('underscore');
_.extend(db.Model.prototype, validation.mixin);

var app = feathers()
  .configure(feathers.socketio())
  .use('/tasks', require('./tasks/service'))

//  .listen(5000);

module.exports = app;
