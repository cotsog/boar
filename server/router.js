var router = require('koa-router')();

require('./controllers/index')(router);
require('./controllers/api')(router);

module.exports = router;