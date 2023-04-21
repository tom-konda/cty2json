'use strict';

import { analyze } from '../../src/ts/lib/cty2json';

import { checkHistoryData, checkMiscData, checkTileData } from '../common/cityDataCommonTest';
import {readFileSync} from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { describe, it } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const fixturesDir = `${__dirname}/../fixtures`;

describe(
  'Cty2JSON library testing',
  () => {
    const file = readFileSync(`${fixturesDir}/cty2jsonTest.cty`);
    const cityData = analyze(new Uint8Array(file).buffer);

    it(
      'Check History Data Order',
      () => {
        checkHistoryData(cityData);
      }
    )

    it(
      'Get City Budget',
      () => {
        checkMiscData(cityData);
      }
    )

    it(
      'Check tile data',
      () => {
        checkTileData(cityData);
      }
    )
  }
)