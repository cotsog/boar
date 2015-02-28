'use strict';

class IndexController {

  constructor ($http) {
    console.log($http);
  }
}

module.exports = [
  '$http',
  IndexController
];