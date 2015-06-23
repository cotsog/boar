'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var tasks = require('boar-tasks').getTasks(gulp, {
  client: {
    vendors: [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js'
    ],
    stylesheets: {
      plugins: [require('bootstrap-styl')()]
    }
  },
  server: {
    test: {
      requires: ['co-mocha', './setup/mocha_server.js']
    }
  }
});

gulp.task('build', ['build-clean'], function(done) {
  runSequence([
    'server-copy', 'client-build'
  ], done);
});

var startTasks = function(done) {
  runSequence('server', 'server-watch', 'client-watch', function() {
    done();
  });
};

gulp.task('start', ['build'], startTasks);
gulp.task('start-quick', startTasks);

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
  gulp.watch(tasks.config.client.stylesheets.watchPattern, ['client-build-stylesheets']);
  gulp.watch(tasks.config.client.app.viewPattern, ['client-build-views']);
});

gulp.task('client-test-run', tasks.client.test);
gulp.task('client-test', function(done) {
  runSequence('client-build-views', 'client-test-run', function() {
    done();
  });
});

// End to End Tasks
gulp.task('e2e-test-run', tasks.e2e.test);
gulp.task('e2e-test-start', tasks.e2e.startServer);
gulp.task('e2e-test-end', tasks.e2e.stopServer);
gulp.task('e2e-test', function(done) {
  runSequence('e2e-test-start', 'e2e-test-run', 'e2e-test-end', function() {
    done();
  });
});
gulp.task('update-webdriver', tasks.e2e.updateWebDriver);