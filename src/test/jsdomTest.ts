'use strict';

import jsdom = require('jsdom');
import fs = require('fs');
const file = fs.readFileSync(`${__dirname}/fixture/cty2jsonTest.cty`);
const base64 = file.toString('base64');
import powAssert = require('power-assert');
const Cty2JSON = <Cty2JSONStatic>require('../../dist/cty2json');

const doc = jsdom.jsdom(
  '<html><head></head><body></body></html>',
  {
  }
);

const win = doc.defaultView;
const dataURLSch = `data:application/octet-binary;base64,${base64}`;

const xhr = new win.XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    const json = Cty2JSON.analyzeData(xhr.response);
    const cityData = <Cty2JSONFileFormat>JSON.parse(json);
    describe(
      'jsDOM Cty2JSON',
      function () {
        it(
          'Get City Budget',
          function () {
            powAssert.deepEqual(cityData.miscData.budget , 10560, 'File is not analyzed correctly.');
          }
        )
      }
    )
  }
}

xhr.open('GET', dataURLSch);
xhr.responseType = 'arraybuffer';
xhr.send();