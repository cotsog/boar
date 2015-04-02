'use strict';
var MailService = require('./mail');

describe('MailService', function() {
  var $httpBackend, subject, $scope;
  var response = {
    all: []
  };
  var sendResponse = {
    success: true
  };

  beforeEach(function() {
    inject(function(_$http_, _$httpBackend_, _$q_, _$rootScope_) {
      $httpBackend = _$httpBackend_;
      subject = new MailService(_$http_, _$q_);
      $scope = _$rootScope_;
    });
  });

  it('#getMail should return results of http request', function(done) {
    $httpBackend
      .expectGET('/api/mail').respond(response);

    subject.getMail().success(function(result) {
      expect(result).to.eql(response);
      done();
    });
    $httpBackend.flush();
  });

  it('#sendMail should return results of http request', function(done) {
    $httpBackend
      .expectPOST('/api/send')
      .respond(sendResponse);

    subject.sendMail({}).then(function(result) {
      expect(result).to.eql(sendResponse);
      done();
    });
    $httpBackend.flush();
    $scope.$apply();
  });
});