var angular = require('angular');
var restangular = require('restangular');
var xeditable = require('angular-xeditable');

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

    $scope.updateTask = function (data, id) {
      var task = Restangular.one('tasks', id);
      angular.extend(task, data);
      return task.put();
    };

    $scope.createTask = function () {
      var task = Restangular.one('tasks');
      task.name = "name";
      task.description = "description";

      task.post().then(function (res) {
        newTask.id = res.id;
        $scope.tasks.push(newTask);
      }, function (err) {
        console.error(err);
      });
    };
  }]);
