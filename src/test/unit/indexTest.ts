'use strict';
import Cty2JSON from '../../ts/lib/cty2json';

import cityDataCommonTest = require('../common/cityDataCommonTest');
import fs = require('fs');
const fixturesDir = `${__dirname}/../fixtures`;

describe(
  'index.js Cty2JSON',
  function() {
    const file = fs.readFileSync(`${fixturesDir}/cty2jsonTest.cty`);
    const cityData = Cty2JSON.analyze(new Uint8Array(file).buffer) as cty2JSONDataFormat;

    it(
      'Check History Data Order',
      function() {
        cityDataCommonTest.checkHistoryData(cityData);
      }
    )

    it(
      'Get City Budget',
      function() {
        cityDataCommonTest.checkMiscData(cityData);
      }
    )

    it(
      'Check tile data',
      function() {
        cityDataCommonTest.checkTileData(cityData);
      }
    )
  }
)