var bb = require('backbone');

module.exports = bb.Model.extend({
  initialize: function () {
    var self = this;
    this.on('change', function () {
      self.validate();
    });
  },
  validation: require('./validation'),
});
