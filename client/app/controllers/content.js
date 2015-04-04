'use strict';

class ContentController {

  constructor($scope, $rootScope, mailService) {
    this.$scope = $scope;
    this.$rootScope = $rootScope;
    this.mailService = mailService;

    $scope.showingReply = false;
    $scope.reply = {};

    $scope.toggleReplyForm = this.toggleReplyForm();
    $scope.sendReply = this.sendReply();
    
    $scope.$watch('selectedMail', function() {
      $scope.showingReply = false;
      $scope.reply = {};
    });
  }

  sendReply() {
    return () => {
      this.$scope.showingReply = false;
      this.$rootScope.loading = true;

      this.mailService.sendMail(this.$scope.reply).then((status) => {
        this.$rootScope.loading = false;
      }, (err) => {
        this.$rootScope.loading = false;
      });
    }
  }

  toggleReplyForm() {
    return () => {
      this.$scope.showingReply = !this.$scope.showingReply;
      let oldMailBody = this.$scope.selectedMail.body;
      this.$scope.reply = {
        to: this.$scope.selectedMail.from.join(', '),
        body: `\n\n ------------------------------ \n\n ${oldMailBody}`
      };
    }
  }
}

module.exports = ContentController;