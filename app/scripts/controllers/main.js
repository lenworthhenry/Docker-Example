'use strict';

angular.module('workspaceApp')
  .controller('MainCtrl', function ($scope, Userservice) {
    $scope.awesomeThings = [
      'LawNovo',
      'Open Source',
      'Entrepeneur'
    ];
    $scope.Blah = Userservice.Path();

  }


                   );;
