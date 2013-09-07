'use strict';

angular.module('workspaceApp')
  .service('Userservice', function Userservice($log) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    var service1={};

    this.Path = function(){
      $log.info("Path is getting called!");
    return "Bla+Bla+Bla";
    };


  });
