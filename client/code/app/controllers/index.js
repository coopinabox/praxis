angular.module('app', ['ngRoute', 'xeditable', 'app.header', 'app.tasks'])
  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider.when('/', {
      templateUrl: 'tasks.html',
      title: 'Tasks',
    });
    
    $routeProvider.otherwise({redirectTo: '/'});
    
    $locationProvider.html5Mode(true);
  }])
  .run(['$rootScope', 'editableOptions', function($rootScope, editableOptions) {
    $rootScope.name = "workclock";

    editableOptions.theme = 'bs3';
  }])
  .controller('app', ['$rootScope', '$route', function ($rootScope, $route) {
    // listen to route change to dynamically set title and template.
    $rootScope.$on("$routeChangeSuccess", function($currentRoute, $previousRoute) {
      $rootScope.title = $route.current.title;
    });
  }]);
