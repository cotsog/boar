'use strict';

class MailService {
  constructor ($http, $q) {
    this.$http = $http;
    this.$q = $q;
  }

  getMail () {
    return this.$http({
      method: 'GET',
      url: '/api/mail'
    });
  }

  sendMail (mail) {
    var deferred = this.$q.defer();

    this.$http({
      method: 'GET',
      data: mail,
      url: '/api/send'
    }).success(function(data, status, header) {
      deferred.resolve(data);
    }).error(function(data, status, header) {
      deferred.reject(data);
    });

    return deferred.promise();
  }
}

module.exports = [
  '$http',
  function($http) {
    return new MailService($http);
  }
];