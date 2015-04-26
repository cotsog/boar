'use strict';

module.exports = function(router) {
  router.get('/', function *() {
    this.render('index');
  });
};