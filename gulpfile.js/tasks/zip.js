// ==== ZIP ==== //

const gulp = require('gulp');
const zip = require('gulp-zip');
const config = require('../../gulpconfig').zip;
const del = require('del');
const git = require('gulp-git');

/**
 * Given a source path and a git hash, create a path that consists of the source path with the git hash appended to it.
 */
function makeHashFoldername(src, hash) {
  if (src.endsWith('/')) {
    src = src.substr(0, src.length - 1);
  }
  return src + '-' + hash + '/';
}

gulp.task('clean-zip', function() {
  return del(config.dest.zipdest + config.dest.zipname);
});

var GIT_HASH;

gulp.task('git-hash', function(cb) {
  return git.revParse({ args: '--short HEAD' }, function(err, hash) {
    GIT_HASH = hash;
    cb();
  });
});

// TODO: ideally the dist task would put everything in the right folder and we wouldn't have to copy it
gulp.task(
  'move-to-hash-folder',
  ['clean-zip', 'build', 'dist', 'git-hash'],
  function() {
    return gulp
      .src([config.src + '**/*'])
      .pipe(gulp.dest(makeHashFoldername(config.src, GIT_HASH)));
  }
);

gulp.task(
  'zip',
  ['clean-zip', 'build', 'dist', 'git-hash', 'move-to-hash-folder'],
  function() {
    var task = gulp
      .src([makeHashFoldername(config.src, GIT_HASH) + '**/*'], {
        base: './dist/',
      })
      .pipe(zip(config.dest.zipname))
      .pipe(gulp.dest(config.dest.zipdest));
    task.on('end', function() {
      del(makeHashFoldername(config.src, GIT_HASH));
    });
    return task;
  }
);
