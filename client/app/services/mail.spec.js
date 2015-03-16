'use strict';

describe('MailService', function() {
  var $http, $httpBackend;

  beforeEach(function() {
    inject(function(_$http_, _$httpBackend_) {
      $http = _$http_;
      $httpBackend = _$httpBackend_;
    });
  });

  it('it should work', function() {
    console.log($httpBackend);
  });
});