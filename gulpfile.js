const path = require('path');
const gulp = require('gulp');
const babel = require('gulp-babel');
const cachebust = require('gulp-cache-bust');
const autoprefixer = require('gulp-autoprefixer');
const csso = require('gulp-csso');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');

const dist = path.resolve(__dirname, 'public');
const AUTOPREFIXER_BROWSERS = [
  'ie >= 11',
  'ie_mob >= 11',
  'ff >= 52',
  'chrome >= 34',
  'safari >= 10.1',
  'opera >= 54',
  'ios >= 9.3',
  'android >= 4.4',
  'bb >= 10'
];

gulp.task('styles', function () {
  return gulp.src('./css/styles.scss')
    .pipe(sass({
      outputStyle: 'nested',
      precision: 10,
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(csso())
    .pipe(gulp.dest(path.join(dist, '/css')))
});

gulp.task('morph', function() {
  return gulp.src('./js/morph.js')
    .pipe(babel())
    .pipe(uglify())
    .pipe(gulp.dest(path.join(dist, '/js')))
});

gulp.task('scripts', function() {
  return gulp.src('./js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest(path.join(dist, '/js')))
});

gulp.task('html', function() {
  return gulp.src('./index.html')
    .pipe(cachebust({
      basePath: 'public/'
    }))
    .pipe(gulp.dest(dist));
});

gulp.task('favicon', function() {
  return gulp.src('./favicon.ico')
    .pipe(gulp.dest(dist));
});

gulp.task('default', null, function () {
  runSequence(
    'styles',
    'html',
    'favicon',
    'scripts',
    'morph',
  );
});