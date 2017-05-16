'use strict';
const Cty2JSON = <Cty2JSONStatic>require('../../');

import cityDataCommonTest = require('./cityDataCommonTest');
import fs = require('fs');

describe(
  'index.js Cty2JSON',
  function () {
    const file = fs.readFileSync(`${__dirname}/fixture/cty2jsonTest.cty`);
    const json = Cty2JSON.analyze(new Uint8Array(file).buffer);
    const cityData = <cty2JSONDataFormat>JSON.parse(json);

    it(
      'Check History Data Order',
      function () {
        cityDataCommonTest.checkHistoryData(cityData);
      }
    )

    it(
      'Get City Budget',
      function () {
        cityDataCommonTest.checkMiscData(cityData);
      }
    )

    it(
      'Check tile data',
      function () {
        cityDataCommonTest.checkTileData(cityData);
      }
    )
  }
)