'use strict';
import powAssert = require('power-assert');
import childProc = require('child_process');
import fs = require('fs');
import os = require('os');
import tmp = require('tmp');

describe(
  'cli Cty2JSON failure test',
  function() {
    it(
      'File is missing',
      function (done) {
        childProc.exec(
          [
            'node',
            './bin/cli.js',
            `${__dirname}/fixture/c.cty`,
          ].join(' '),
          (error, stdout, stderr) => {
            powAssert.notEqual(error, null, 'File check is not worked.');
            done();
          }
        );
      }
    )
    it(
      'File is wrong format',
      function (done) {
        childProc.exec(
          [
            'node',
            './bin/cli.js',
            `${__dirname}/fixture/wrong.cty`,
          ].join(' '),
          (error, stdout, stderr) => {
            powAssert.notEqual(error, null, 'File format is not checked.');
            done();
          }
        );
      }
    )
  }
)

describe(
  'cli Cty2JSON output test',
  function() {
    let tmpFileName = `cty2json-${new Date().getTime()}-test.json`;
    let tmpFile:tmp.SynchrounousResult;
    before(
      function () {
        tmpFile = tmp.fileSync({
          prefix : `cty2json-${new Date().getTime()}`,
        })
      }
    );

    it(
      'Output test',
      function (done) {
        childProc.exec(
          [
            'node',
            './bin/cli.js',
            `${__dirname}/fixture/cty2jsonTest.cty`,
          ].join(' '),
          (error, stdout, stderr) => {
            powAssert.notEqual(stdout , null, 'Output is not correctly.');
            done()
          }
        );
      }
    )
    it(
      'JSON output test',
      function () {
        childProc.execSync(
          [
            'node',
            './bin/cli.js',
            `${__dirname}/fixture/cty2jsonTest.cty`,
            '-o',
            `${tmpFile.name}`,
          ].join(' ')
        );
        const json = fs.readFileSync(`${tmpFile.name}`, 'utf8');
        const cityData = <Cty2JSONFileFormat>JSON.parse(json);
        powAssert.deepEqual(cityData.miscDatas.budget , 10560, 'File is not created correctly.');
      }
    )

    after(
      function () {
        fs.unlinkSync(`${tmpFile.name}`);
      }
    )
  }
)