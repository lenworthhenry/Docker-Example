'use strict';

angular.module('workspaceApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/u', {
        templateUrl: 'views/u.html',
        controller: 'UCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
