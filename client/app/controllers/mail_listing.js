'use strict';

class MailListingController {

  constructor ($scope, $http) {
    $scope.emails = [
      {
        'id': 1,
        'from': 'me@gmail.com',
        'to': 'you@gmail.com',
        'subject': 'Great job'
      },
      {
        'id': 2,
        'from': 'me2@gmail.com',
        'to': 'you2@gmail.com',
        'subject': 'Great job too'
      }
    ];

    $http({
      method: 'GET',
      url: '/api/mail'
    })
  }
}

module.exports = [
  '$scope', '$http',
  MailListingController
];