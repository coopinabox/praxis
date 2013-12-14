var bookshelf = require('bookshelf');
var Bookshelf = bookshelf.initialize(require('./db.json').database);
module.exports = Bookshelf;
