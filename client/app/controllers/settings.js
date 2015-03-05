'use strict';

class SettingsController {

  constructor ($scope) {
    this.$scope = $scope;

    this.$scope.updateSettings = () => {
      console.log(this.$scope);
    }
  }
}

module.exports = [
  '$scope',
  SettingsController
];