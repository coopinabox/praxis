"use strict";

var feathers = require('feathers');
var ecstatic = require('ecstatic');

var isProd = require('ciab-utils/isProduction');

module.exports = feathers()
  .configure(feathers.socketio())
  .use('/actions', require('ciab-actions-api'))
  .use(ecstatic({
    root: __dirname + '/../static',
    cache: (isProd ? 3600 : 0),
  }));
