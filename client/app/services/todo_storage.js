'use strict';

module.exports = function ($http, $injector) {
  return $http.get('/api')
    .then(function () {
      return $injector.get('api');
    }, function () {
      return $injector.get('localStorage');
    });
};