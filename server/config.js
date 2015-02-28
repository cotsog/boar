var path = require('path');

module.exports = {
  root: path.normalize(__dirname + '/../'),
  env: process.env.NODE_ENV,
  ip: process.env.IP || undefined,
  port: process.env.PORT || 3000,
  mongooseUri: process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||  'mongodb://localhost/tasksexample'
};