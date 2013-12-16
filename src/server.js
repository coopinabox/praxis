"use strict";

var server = require('server');
var isProd = require('utils').isProd;

server.listen(isProd ? 80 : 5000);

module.exports = server;
