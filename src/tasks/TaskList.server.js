"use strict";

var db = require('../db');

var Task = require('./Task.server');

module.exports = db.Collection.extend({
  model: Task,
  initialize: function () {
    this.fetch();
  },
});
