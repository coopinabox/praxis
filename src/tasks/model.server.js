var db = require('../db');

module.exports = db.Model.extend({
  tableName: 'tasks',
  validation: require('./validation'),
  initialize: function () {
    var self = this;
    this.on('saving', function () {
      var err = self.validate();
      if (err) throw err;
    });
  },
});
