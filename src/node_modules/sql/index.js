var bookshelf = require('bookshelf');
var config = require('./config');

module.exports = bookshelf.initialize(config.database);
