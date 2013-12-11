var angular = require('angular');
var restangular = require('restangular');
var xeditable = require('angular-xeditable');
var _ = require('underscore');

angular.module('app.controllers', ['restangular', 'xeditable'])
  .controller('app', ['$rootScope', '$route', function ($rootScope, $route) {
    // listen to route change to dynamically set title and template.
    $rootScope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
      $rootScope.title = $route.current.title;
    });
  }])
  .controller('Header', ['$scope', function ($scope) {
  }])
  .controller('TaskCtrl', ['$scope', 'Restangular', function($scope, Restangular) {

    $scope.tasks = [];

    Restangular.all('tasks').getList().then(function (tasks) {
      $scope.tasks = tasks;
    });

    $scope.updateTask = function (task, data) {
      angular.extend(task, data);
      return task.put().then(null, function (resp) {
        console.log(resp);
        if (resp.status === 400 && resp.data) {
          _.each(resp.data, function (errors, value) {
            console.log(errors, value);
            var error = _.pluck(errors, 'rule').join('; ');
            // issue: https://github.com/angular/angular.js/issues/1404
            console.log(error, $scope.taskform);
            //$scope.taskform.$setError(field, error.message);
          });
        }
      }, function (resp) {
        console.error(resp);
      });
    };

    $scope.createTask = function () {
      var task = Restangular.one('tasks');
      task.post().then(function (resp) {
        task.id = resp.id;
        $scope.tasks.push(task);
        $scope.inserted = task;
      }, function (resp) {
        console.error(resp);
      });
    };

    $scope.removeTask = function (task, index) {
      task.remove().then(function () {
        $scope.tasks.splice(index, 1);
      }, function (resp) {
        console.error(resp);
      });
    };
  }]);