var db = require('../db');

require('../validation.server');

module.exports = db.Model.extend({
  tableName: 'tasks',
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
  validation: require('./validation'),
});
