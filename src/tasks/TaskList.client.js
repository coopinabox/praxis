"use strict";

var bb = require('backbone');

var Task = require('./Task.client');

module.exports = bb.Collection.extend({
  model: Task,
  url: '/tasks',
  initialize: function () {
    this.fetch();
  },
});
