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
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
      })
      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'LogoutCtrl'
      })
      .when('/loggedin', {
        templateUrl: 'views/loggedin.html',
        controller: 'LoggedinCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
