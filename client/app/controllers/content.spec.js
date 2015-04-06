'use strict';
var angular = require('angular');
var mailer = require('../mailer');

describe('ContentController', function() {
  var controller, $scope, MailService, $rootScope, sendMailResolve, s;

  beforeEach(function() {
    angular.mock.module('MailerApp');
  });

  beforeEach(function() {
    s = sinon.sandbox.create();
    inject(function($controller, _$rootScope_, _MailService_) {
      $rootScope = _$rootScope_;
      $scope = _$rootScope_.$new();
      controller = $controller('ContentController', {$scope: $scope});

      MailService = _MailService_;
    });
  });

  afterEach(function() {
    $scope.$destroy();
    s.restore();
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

  it('should send reply', function() {
    $scope.reply = {
      to: 'sender@gmail.com',
      body: '\n\n ------------------------------ \n\n original body'
    };
    $scope.showingReply = true;

    $scope.sendReply();

    expect($scope.showingReply).to.be.false;
    expect($rootScope.loading).to.be.true;
  });

  it('should revoke loading flag after finished sending reply', function(done) {
    $scope.reply = {
      to: 'sender@gmail.com',
      body: '\n\n ------------------------------ \n\n original body'
    };

    s.stub(MailService, 'sendMail').returns(Promise.resolve({}));

    $scope.sendReply().then(function() {
      expect($rootScope.loading).to.be.false;

      done();
    });
  });
});