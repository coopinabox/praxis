"use strict";

// add validation to backbone

var _ = require('underscore');
var bb = require('backbone');
var validation = require('backbone-validation');
_.extend(bb.Model.prototype, validation.mixin);


_.extend(validation.callbacks, {
  valid: function(view, attr, selector) {
    var control = $(view.find('[' + selector + '=' + attr + ']'));
    var group = control.parents('.form-group');
    group.removeClass('has-error');
    if (control.data('error-style') === 'tooltip') {
      if (control.data('tooltip')) {
        return control.tooltip('hide');
      }
    } else if (control.data('error-style') === 'inline') {
      return group.find('.help-inline.error-message').remove();
    } else {
      return group.find('.help-block.error-message').remove();
    }
  },
  invalid: function(view, attr, error, selector) {
    var control = $(view.find('[' + selector + '=' + attr + ']'));
    var group = control.parents('.form-group');
    group.addClass('has-error');
    if (control.data('error-style') === 'tooltip') {
      var position = control.data('tooltip-position') || 'right';
      control.tooltip({
        placement: position,
        trigger: 'manual',
        title: error
      });
      return control.tooltip('show');
    } else if (control.data('error-style') === 'inline') {
      if (group.find('.help-inline').length === 0) {
        group.find('.form-control').after('<span class=\'help-inline error-message\'></span>');
      }
      var target = group.find('.help-inline');
      return target.text(error);
    } else {
      if (group.find('.help-block').length === 0) {
        group.find('.form-control').after('<p class=\'help-block error-message\'></p>');
      }
      var target = group.find('.help-block');
      return target.text(error);
    }
  }
});
