'use strict';
var angular = require('angular');
var todo = require('../todo');

beforeEach(angular.mock.module('TodoApp'));

describe('todoFocus directive', function () {
  var scope, compile, browser;

  beforeEach(inject(function ($rootScope, $compile, $browser) {
    scope = $rootScope.$new();
    compile = $compile;
    browser = $browser;
  }));

  it('should focus on truthy expression', function () {
    var el = angular.element('<input todo-focus="focus">');
    scope.focus = false;

    compile(el)(scope);
    expect(browser.deferredFns.length).to.equal(0);

    scope.$apply(function () {
      scope.focus = true;
    });

    expect(browser.deferredFns.length).to.equal(1);
  });
});