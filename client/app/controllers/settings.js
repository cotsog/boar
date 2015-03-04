'use strict';

class SettingsController {

  constructor ($http) {
    console.log($http);
  }
}

module.exports = [
  '$http',
  SettingsController
];