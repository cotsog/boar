var router = require('koa-router')();

router.get('/', function *() {
  yield this.render('index');
});

router.get('/api/mail', function *() {
  this.body = require('./fixtures/mail');
});

router.post('/api/send', function *() {
  this.body = {
    id: 101
  };
});

module.exports = router;