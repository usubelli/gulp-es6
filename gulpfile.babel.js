'use strict';

import gulp from 'gulp';
import sass from 'gulp-sass';
import cleanCSS from 'gulp-clean-css';
import concatCss from 'gulp-concat-css';
import concat from 'gulp-concat';
import minify  from 'gulp-minify';
import browserSync from 'browser-sync'; 
import babel from 'gulp-babel';

// PATHS
const sassPaths = {
  src: 'app/scss/**/*.scss',
  dest: 'app/css/src'
};
const jsPaths = {
  src: 'app/js/es6/*.js',
  dest: 'app/js/build'
};
 
 
// BABEL
gulp.task('es6', () => {
  gulp.src(jsPaths.src)
    .pipe(babel({ignore: 'gulpfile.babel.js'}))
    .pipe(gulp.dest(jsPaths.dest));
});

//CONCAT JS
gulp.task('scripts', () => {
  return gulp.src(['app/js/build/modernizr-custom.js', 'app/js/build/lazy-loading.js', 'app/js/build/main.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('app/js/dist/'));
});

// MINIFY JS
gulp.task('compress', () => {
  gulp.src('app/js/dist/all.js')
    .pipe(minify({  
    }))
    .pipe(gulp.dest('app/js/dist'))
});



// SASS
gulp.task('sass', () => {
  gulp.src(sassPaths.src) 
    .pipe(sass())
    .pipe(gulp.dest(sassPaths.dest))
    .pipe(browserSync.reload({ stream: true }))
});

// CONCAT CSS
gulp.task('concat-css', function () {
  return gulp.src('app/css/src/*.css')
    .pipe(concatCss("all-min.css"))
    .pipe(gulp.dest('app/css/dist/'));
});

// MINIFY-CSS
gulp.task('minify-css', () => {
  return gulp.src('app/css/dist/all-min.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('app/css/dist'));
});



// BROWSERSYNC
gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: 'app'
    },
  })
});

// WATCH
gulp.task('watch', ['browserSync', 'sass', 'es6'],  () => {
  gulp.watch(sassPaths.src, ['sass']); 
  gulp.watch(jsPaths.src, ['es6']);
  gulp.watch('app/*.html', browserSync.reload); 
  gulp.watch('app/js/**/*.js', browserSync.reload); 
});

// PROD
gulp.task('prod', ['concat-css', 'minify-css', 'scripts', 'compress']);
