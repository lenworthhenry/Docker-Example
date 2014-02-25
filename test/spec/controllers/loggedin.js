'use strict';

describe('Controller: LoggedinCtrl', function () {

  // load the controller's module
  beforeEach(module('workspaceApp'));

  var LoggedinCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LoggedinCtrl = $controller('LoggedinCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
