'use strict';
import assert = require('assert');
import { spawnSync } from 'child_process';
import { readFileSync, unlinkSync } from 'fs';
import { fileSync, FileResult } from 'tmp';
import { checkMiscData, checkTileData, checkHistoryData } from '../common/cityDataCommonTest';

const fixturesDir = `${__dirname}/../fixtures`;

describe(
  'cli Cty2JSON failure test',
  () => {
    it(
      'File is missing',
      () => {
        const {stderr} = spawnSync(
          'node',
          [
            './bin/cli.js',
            `${fixturesDir}/c.cty`,
          ]
        );
        assert.notEqual(stderr.toString().length, 0, 'File check is not worked.');
      }
    )
    it(
      'File is wrong format',
      () => {
        const {stderr} = spawnSync(
          'node',
          [
            './bin/cli.js',
            `${fixturesDir}/wrong.cty`,
          ]
        );
        assert.notEqual(stderr.toString().length, 0, 'File format is not checked.');
      }
    )
    it(
      'Output to non-existent directory',
      () => {
        const {stderr} = spawnSync(
          'node',
          [
            './bin/cli.js',
            `${fixturesDir}/cty2jsonTest.cty`,
            `-o`,
            `foobar/hogehoge.json`
          ]
        );
        assert.notEqual(stderr.toString().length, 0, `Output error isn't checked.`);
      }
    )
  }
)

describe(
  'cli Cty2JSON output test',
  () => {
    let tmpFile: FileResult;
    let fileLength = 0;
    before(
      () => {
        tmpFile = fileSync({
          prefix: `cty2json-${new Date().getTime()}`,
        })
      }
    );

    it(
      'JSON output test',
      () => {
        spawnSync(
          'node',
          [
            './bin/cli.js',
            `${fixturesDir}/cty2jsonTest.cty`,
            '-o',
            `${tmpFile.name}`,
          ]
        );
        const json = readFileSync(`${tmpFile.name}`, 'utf8');
        const cityData = JSON.parse(json) as cty2JSONDataFormat;
        fileLength = json.length + 3000;
        checkHistoryData(cityData, 'File is not created correctly.');
        checkMiscData(cityData, 'File is not created correctly.');
      }
    )
    it(
      'Output test',
      () => {
        const {stdout} = spawnSync(
          'node',
          [
            './bin/cli.js',
            `${fixturesDir}/cty2jsonTest.cty`,
          ],
          {
            maxBuffer: fileLength,
          }
        );
        const cityData = JSON.parse(stdout.toString()) as cty2JSONDataFormat;
        checkMiscData(cityData);
        checkTileData(cityData);
      }
    )

    after(
      () => {
        unlinkSync(`${tmpFile.name}`);
      }
    )
  }
)