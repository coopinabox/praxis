var db = require('../db');

var Model = require('./model.server');

module.exports = db.Collection.extend({
  model: Model,
  initialize: function () {
    this.fetch();
  },
});
