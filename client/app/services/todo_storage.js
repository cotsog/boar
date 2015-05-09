'use strict';

module.exports = function ($http, $injector) {
  return $http.get('/api/todos')
    .then(function () {
      return $injector.get('api');
    }, function () {
      return $injector.get('localStorage');
    });
};