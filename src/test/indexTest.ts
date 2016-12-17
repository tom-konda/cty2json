'use strict';
const Cty2JSON = <Cty2JSONStatic>require('../../');

import fs = require('fs');
import assert = require('power-assert');

describe(
  'index.js Cty2JSON',
  function () {
    it(
      'Get City Budget',
      function () {
        const file = fs.readFileSync(`${__dirname}/fixture/cty2jsonTest.cty`);
        const json = Cty2JSON.analyzeData(new Uint8Array(file).buffer);
        const cityData = <Cty2JSONFileFormat>JSON.parse(json);
        assert.deepEqual(cityData.miscData.budget, 10560, 'File is not analyzed correctly.');
      }
    )
  }
)