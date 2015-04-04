'use strict';
var angular = require('angular');
var mailer = require('../mailer');

describe('ContentController', function() {
  var controller, $scope;

  beforeEach(function() {
    angular.mock.module('MailerApp');
  });

  beforeEach(function() {
    inject(function($controller, $rootScope) {
      $scope = $rootScope.$new();
      controller = $controller('ContentController', {$scope: $scope});
    });
  });

  afterEach(function() {
    $scope.$destroy();
  });
  
  it('should toggle reply form', function() {
    $scope.selectedMail = {
      body: 'original body',
      from: ['sender@gmail.com']
    };

    $scope.toggleReplyForm();

    expect($scope.showingReply).to.be.true;
    expect($scope.reply).to.eql({
      to: 'sender@gmail.com',
      body: '\n\n ------------------------------ \n\n original body'
    });
  });
});