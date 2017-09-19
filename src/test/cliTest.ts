'use strict';
import assert = require('assert');
import childProc = require('child_process');
import fs = require('fs');
import tmp = require('tmp');
import cityDataCommonTest = require('./cityDataCommonTest');

describe(
  'cli Cty2JSON failure test',
  function () {
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
        assert.notEqual(result.stderr.length, 0, 'File check is not worked.');
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
        assert.notEqual(result.stderr.length, 0, 'File format is not checked.');
      }
    )
    it(
      'Output to non-existent directory',
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
        assert.notEqual(result.stderr.length, 0, `Output error isn't checked.`);
      }
    )
  }
)

describe(
  'cli Cty2JSON output test',
  function () {
    let tmpFile: tmp.SynchrounousResult;
    before(
      function () {
        tmpFile = tmp.fileSync({
          prefix: `cty2json-${new Date().getTime()}`,
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
        const cityData = <cty2JSONDataFormat>JSON.parse(result.stdout);
        cityDataCommonTest.checkMiscData(cityData);
        cityDataCommonTest.checkTileData(cityData);
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
        const cityData = <cty2JSONDataFormat>JSON.parse(json);
        cityDataCommonTest.checkHistoryData(cityData, 'File is not created correctly.');
        cityDataCommonTest.checkMiscData(cityData, 'File is not created correctly.');
      }
    )

    after(
      function () {
        fs.unlinkSync(`${tmpFile.name}`);
      }
    )
  }
)