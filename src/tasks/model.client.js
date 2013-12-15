var bb = require('backbone');

module.exports = bb.Model.extend({
  initialize: function () {
    this.on('change', function () {
      if (this.hasChanged()) {
        this.save();
      }
    });
    this.on('invalid', function (model, error) {
      console.error("invalid model", model, error);
    });
  },
  validation: require('./validation'),
});
