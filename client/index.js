angular = require('angular');
var ngRoute = require('angular-route');
var xeditable = require('angular-xeditable');

require('./filters');
require('./services');
require('./directives');
require('./controllers');

module.exports = angular.module('app', ['app.filters', 'app.services', 'app.directives', 'app.controllers', 'ngRoute', 'xeditable'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
      templateUrl: 'partials/tasks.html',
      title: 'Tasks',
    });
    
    $routeProvider.otherwise({redirectTo: '/'});
    
    $locationProvider.html5Mode(true);
  }])
  .run(['$rootScope', 'editableOptions', function($rootScope, editableOptions) {
    $rootScope.name = "workclock";

    editableOptions.theme = 'bs3';
  }]);
