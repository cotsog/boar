'use strict';
var HomeController = require('./home');

describe('HomeController', function() {
  var subject, $scope, mail;

  beforeEach(function() {
    mail = {
      id: 1,
      subject: 'First time'
    };

    inject(function(_$rootScope_, _$sce_) {
      $scope = _$rootScope_.$new();
      subject = new HomeController($scope, _$sce_);
    });
  });

  it('should set selected mail', function() {
    $scope.setSelectedMail(mail);

    expect($scope.selectedMail).to.eql(mail);
  });

  it('should show mail is selected', function() {
    $scope.setSelectedMail(mail);

    expect($scope.isSelected(mail)).to.be.true;
  });

  it('should show if mail is not selected', function() {
    expect($scope.isSelected(mail)).to.be.falsy;
  });

  afterEach(function() {
    $scope.$destroy();
  });
});