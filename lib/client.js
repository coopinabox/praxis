"use strict";

var Backbone = require('ciab-backbone');
var React = require('react');
var $ = Backbone.$;

var Actions = require('ciab-actions');
var Header = require('ciab-header');

$(function() {

  // setup header
  React.renderComponent(
    Header.HeaderComponent(),
    document.querySelector('header')
  );

  // show version in title
  document.title = require('ciab-utils/version');

  new Actions.Router();
  Backbone.history.start();
});
