// add validation to backbone

var _ = require('underscore');
var bb = require('backbone');
var validation = require('backbone-validation');
_.extend(bb.Model.prototype, validation.mixin);

_.extend(validation.callbacks, {
  valid: function(view, attr, selector) {
    console.log("valid", view, attr, selector);
    control = $(view.find('[' + selector + '=' + attr + ']'));
    group = control.parents('.form-group');
    group.removeClass('has-error');
  },
  invalid: function(view, attr, error, selector) {
    console.log("invalid", view, attr, selector);
  },
});
