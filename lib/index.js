"use strict";

var server = require('./server');
var isProd = require('ciab-utils/isProduction');

server.listen(isProd ? 80 : 5000);

module.exports = server;
