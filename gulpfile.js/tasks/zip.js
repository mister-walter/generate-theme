// ==== ZIP ==== //

const gulp = require('gulp');
const zip = require('gulp-zip');
const config = require('../../gulpconfig').zip;
const del = require('del');

gulp.task('clean-zip', function() {
  return del(config.dest.zipdest + config.dest.zipname);
});

gulp.task('zip', ['clean-zip', 'build', 'dist'], function() {
  return gulp
    .src([config.src + '**/*'])
    .pipe(zip(config.dest.zipname))
    .pipe(gulp.dest(config.dest.zipdest));
});
