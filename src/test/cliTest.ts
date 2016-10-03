'use strict';
import powAssert = require('power-assert');
import childProc = require('child_process');
import fs = require('fs');
import tmp = require('tmp');

describe(
  'cli Cty2JSON failure test',
  function() {
    it(
      'File is missing',
      function () {
        const result = childProc.spawnSync(
          'node',
          [
            './bin/cli.js',
            `${__dirname}/fixture/c.cty`,
          ]
        );
        powAssert.notEqual(result.stderr.length, 0, 'File check is not worked.');
      }
    )
    it(
      'File is wrong format',
      function () {
        const result = childProc.spawnSync(
          'node',
          [
            './bin/cli.js',
            `${__dirname}/fixture/wrong.cty`,
          ]
        );
        powAssert.notEqual(result.stderr.length, 0, 'File format is not checked.');
      }
    )
    it(
      'Output to non-exsistent dircectory',
      function () {
        const result = childProc.spawnSync(
          'node',
          [
            './bin/cli.js',
            `${__dirname}/fixture/cty2jsonTest.cty`,
            `-o`,
            `foobar/hogehoge.json`
          ]
        );
        powAssert.notEqual(result.stderr.length, 0, `Output error isn't checked.`);
      }
    )
  }
)

describe(
  'cli Cty2JSON output test',
  function() {
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
      function () {
        const result = childProc.spawnSync(
          'node',
          [
            './bin/cli.js',
            `${__dirname}/fixture/cty2jsonTest.cty`,
          ]
        );
        const cityData = <Cty2JSONFileFormat>JSON.parse(result.stdout);
        powAssert.deepEqual(cityData.miscData.budget , 10560, 'Output is not correctly.');
      }
    )
    it(
      'JSON output test',
      function () {
        childProc.spawnSync(
          'node',
          [
            './bin/cli.js',
            `${__dirname}/fixture/cty2jsonTest.cty`,
            '-o',
            `${tmpFile.name}`,
          ]
        );
        const json = fs.readFileSync(`${tmpFile.name}`, 'utf8');
        const cityData = <Cty2JSONFileFormat>JSON.parse(json);
        powAssert.deepEqual(cityData.miscData.budget , 10560, 'File is not created correctly.');
      }
    )

    after(
      function () {
        fs.unlinkSync(`${tmpFile.name}`);
      }
    )
  }
)