"use strict";

var bb = require('backbone');

var Model = require('./model.client');

module.exports = bb.Collection.extend({
  model: Model,
  url: '/tasks',
  initialize: function () {
    this.fetch();
  },
});
