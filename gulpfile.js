'use strict';
const del = require('del');
const gulp = require('gulp');
const shell = require('gulp-shell');
const seq = require('run-sequence');

let opt = {
  root: '.',
  dist: './dist',
  source: './src',
  testSource: './src/test',
  test: './test',
  temp: './temp',
  buildOptionsDir: './src/ts/tsconfigs',
};

gulp.task('fullBuild',
  function(done) {
    seq('ts:build-es6', done);
  }
);

gulp.task('ts:build-es6', shell.task([`npm run ts:build-es6`]));

gulp.task('test', shell.task([`npm test`]));

gulp.task('testRun', ['fullBuild', 'test']);
gulp.task('default', ['fullBuild']);