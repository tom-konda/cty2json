'use strict';
import Cty2JSON from '../../ts/lib/cty2json';

import { checkHistoryData, checkMiscData, checkTileData } from '../common/cityDataCommonTest';
import {readFileSync} from 'fs';
const fixturesDir = `${__dirname}/../fixtures`;

describe(
  'index.js Cty2JSON',
  () => {
    const file = readFileSync(`${fixturesDir}/cty2jsonTest.cty`);
    const cityData = Cty2JSON.analyze(new Uint8Array(file).buffer) as cty2JSONDataFormat;

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