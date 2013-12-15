var bb = require('backbone');

module.exports = bb.Model.extend({
  initialize: function () {
    this.on('change', function () {
      if (this.hasChanged()) {
        this.save();
      }
    });
  },
  validation: require('./validation'),
});
