'use strict';
const Cty2JSON = <Cty2JSONStatic>require('../../dist/cty2json');

import fs = require('fs');
import powAssert = require('power-assert');

describe(
  'cty2json',
  function () {
    it(
      'fileSize',
      function () {
        let file = fs.readFileSync(`${__dirname}/fixture/cty2jsonTest.cty`);
        let uint8arr = new Uint8Array(file);
        let json = Cty2JSON.analyzeData(uint8arr.buffer);
        let cityData = JSON.parse(json);
        powAssert.deepEqual(cityData.fileSize ,27120, 'File Size is not matched.');
      }
    )
  }
)