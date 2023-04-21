'use strict';
import { spawnSync } from 'child_process';
import { readFileSync, unlinkSync } from 'fs';
import { fileSync, FileResult } from 'tmp';
import type{ cty2JSONDataFormat } from '../../declaration/cty2json';
import { checkMiscData, checkTileData, checkHistoryData } from '../common/cityDataCommonTest';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = `${__dirname}/../fixtures`;

describe(
  'cli Cty2JSON failure test',
  () => {
    it(
      'Input file is missing',
      () => {
        const {stderr} = spawnSync(
          'node',
          [
            './bin/cli.js',
            `${fixturesDir}/c.cty`,
          ]
        );
        expect(stderr.toString().length).toBeGreaterThan(0)
      }
    )
    it(
      'Input file is wrong format',
      () => {
        const {stderr} = spawnSync(
          'node',
          [
            './bin/cli.js',
            `${fixturesDir}/wrong.cty`,
          ]
        );
        expect(stderr.toString().length).toBeGreaterThan(0)
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
        expect(stderr.toString().length).toBeGreaterThan(0)
      }
    )
  }
)

describe(
  'cli Cty2JSON output test',
  () => {
    let tmpFile: FileResult;
    beforeEach(
      () => {
        tmpFile = fileSync({
          prefix: `cty2json-${Date.now()}`,
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
        checkHistoryData(cityData);
        checkMiscData(cityData);
        checkTileData(cityData);
      }
    )

    afterEach(
      () => {
        unlinkSync(`${tmpFile.name}`);
      }
    )
  }
)