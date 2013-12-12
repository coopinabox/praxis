angular.module('app.tasks', ['xeditable', 'ssAngular'])
  .controller('TaskCtrl', ['$scope', '$q', 'pubsub', 'rpc', 'model', function($scope, $q, pubsub, rpc, model) {

    $scope.linkModel('tasks', {});

    $scope.updateTask = function (task, data) {
      angular.extend(task, data);

      rpc('tasks.update', task, function (err) {
        if (err) {
          _.each(err.data, function (errors, field) {
            console.log(errors, field);
            var error = _.pluck(errors, 'rule').join('; ');
            // issue: https://github.com/angular/angular.js/issues/1404
            console.log(error, $scope.taskform);
            //$scope.taskform.$setError(field, error.message);
          });
        }
      });
    };

    $scope.createTask = function () {
      rpc('tasks.create', {}, function (err, task) {
        if (err) {
          console.error(err);
          return;
        }
        $scope.tasks.models.push(task);
      });
    };

    $scope.deleteTask = function (task, index) {
      rpc('tasks.delete', task, function (err) {
        if (err) {
          console.error(err);
        }
        $scope.tasks.models.splice(index, 1);
      });
    };
  }]);
