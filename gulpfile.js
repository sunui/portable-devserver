var gulp = require('gulp');
  connect = require('gulp-connect');
  watch = require('gulp-watch');
  url     = require('url'),
  proxy   = require('proxy-middleware');

//config
var options={
  port:9999,
  proxyUrl:'http://your-api-server/api/',
  proxyRoute:'/api'
}

//task
gulp.task('webserver', function() {
  connect.server({
    livereload: true,
    root: ['./'],
    port:options.port,
    middleware: function (connect, opt) {
      var proxyOptions = url.parse('http://52.80.63.160:8180/wcsa/wi/api/');
      proxyOptions.route = options.proxyRoute;
      return [
          proxy(proxyOptions)
      ]
  }
  });
});

gulp.task('livereload', function() {
  gulp.src(['src/**/*.css', 'src/**/*.js','*.html'])
    .pipe(watch())
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.css');
  gulp.watch('src/**/*.js');
  gulp.watch('*.html');
})

//run task
gulp.task('default', ['webserver', 'livereload', 'watch']);
