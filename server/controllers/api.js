'use strict';

module.exports = function(router) {
  router.get('/api/mail', require('./api/mail'));
  router.post('/api/send', require('./api/send'));
};