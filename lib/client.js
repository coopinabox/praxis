"use strict";

var Backbone = require('backbone');
var React = require('react');
var $ = Backbone.$ = require('jquery');

var Actions = require('ciab-actions');
var Header = require('ciab-header-component');

$(function() {

  // setup header
  React.renderComponent(
    Header({
      brand: "praxis",
      menu: [{
        href: "/#actions",
        value: "/#actions",
      }, {
        href: "/actions",
        value: "/actions",
      }],
    }),
    document.querySelector('.header.container')
  );

  // show version in title
  document.title = require('ciab-utils/version');

  new Actions.Router();
  Backbone.history.start();
});
