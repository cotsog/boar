var gulp = require('gulp');
var tasks = require('js-stack.tasks')(gulp, {
  client: {
    vendors: [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js'
    ],
    stylesheets: {
      plugins: ['bootstrap-styl']
    }
  }
});
var runSequence = require('run-sequence');

gulp.task('build', ['build-clean'], function(cb) {
  runSequence([
    'server-copy', 'client-build'
  ], cb);
});

gulp.task('start', ['build'], function() {
  gulp.run('server');
  gulp.run('server-watch');
  gulp.run('client-watch');
});

gulp.task('test', ['server-test', 'client-test']);



// Helper
gulp.task('build-clean', function(cb) {
  tasks.build.clean(cb);
});



// Server Tasks
gulp.task('server', tasks.server.start);
gulp.task('server-copy', function() { return tasks.server.copy(false); });
gulp.task('server-copy-only-changed', function () {
  return tasks.server.copy(true);
});
gulp.task('server-jshint', function() { return tasks.client.jshint(); });
gulp.task('server-watch', function() {
  gulp.watch(tasks.config.server.filePattern, ['server-copy-only-changed']);
});
gulp.task('server-test', tasks.server.test);



// Client Tasks
gulp.task('client-build', [
  'client-build-static',
  'client-build-vendor',
  'client-build-scripts',
  'client-build-stylesheets',
  'client-build-views'
]);
gulp.task('client-build-static', function () { return tasks.client.copyStatic(); });
gulp.task('client-build-vendor', function() { return tasks.client.concatVendors(); });
gulp.task('client-build-vendor-alt', function() { return tasks.client.buildVendors(); });
gulp.task('client-build-scripts', function() { return tasks.client.buildScripts(); });
gulp.task('client-build-stylesheets', function() { return tasks.client.buildStylesheets(); });
gulp.task('client-build-views', function() { return tasks.client.buildViews(); });
gulp.task('client-jshint', function() { return tasks.client.jshint(); });

gulp.task('client-watch', function() {
  gulp.watch(tasks.config.client.static.watchPattern, ['client-build-static']);
  gulp.watch(tasks.config.client.app.watchPattern, ['client-build-scripts']);
  gulp.watch(tasks.config.client.stylesheets.watchPattern, ['client-build-stylesheets']);
  gulp.watch(tasks.config.client.app.viewPattern, ['client-build-views']);
});

gulp.task('client-test', tasks.client.test);

// End to End Tasks
gulp.task('e2e-test', tasks.e2e.test);
gulp.task('update-webdriver', tasks.e2e.updateWebDriver);