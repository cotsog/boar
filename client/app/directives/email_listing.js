'use strict';

var md5 = require('md5');
var url = 'http://www.gravatar.com/avatar/';

var EmailListingDirective = {
  restrict: 'EA',
  replace: false,
  scope: {
    email: '=',
    action: '&',
    shouldUseGravatar: '@',
    gravatarSize: '@'
  },
  templateUrl: 'views/email_listing.html',
  controller: ['$scope', '$element', '$attrs', '$transclude',
    function($scope, $element, $attrs, $transclude) {
      $scope.handleClick = function() {
        $scope.action({
          selectedMail: $scope.email
        });
      };
    }
  ],
  link: function($scope, element, attributes) {
    var size = attributes.gravatarSize || 80;
    var hash = md5.digest_s($scope.email.from[0]);
    $scope.gravatarImage = url + hash + '?size=' + size;

    element.bind('click', function() {
      element.parent().children().removeClass('active');
      element.addClass('active');
    });
  }
};

module.exports = [
  function() {
    return EmailListingDirective;
  }
];