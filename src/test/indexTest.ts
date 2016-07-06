'use strict';
require('../../');

import fs = require('fs');
import powAssert = require('power-assert');

describe(
  'index.js Cty2JSON',
  function () {
    it(
      'Get City Budget',
      function () {
        const file = fs.readFileSync(`${__dirname}/fixture/cty2jsonTest.cty`);
        const json = Cty2JSON.analyzeData(new Uint8Array(file).buffer);
        const cityData = <Cty2JSONFileFormat>JSON.parse(json);
        powAssert.deepEqual(cityData.miscDatas.budget , 10560, 'File is not analyzed correctly.');
      }
    )
  }
)