var db = require('../db');

module.exports = db.Model.extend({
  tableName: 'tasks',
  validation: require('./validation'),
  defaults: {
    name: "",
    description: "",
  },
  initialize: function () {
    var self = this;
    this.on('saving', function () {
      var err = self.validate();
      if (err) throw err;
    });
  },
});
