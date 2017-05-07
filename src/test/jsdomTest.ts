'use strict';

import jsdom = require('jsdom');
const { JSDOM } = jsdom as any;
import fs = require('fs');
const file = fs.readFileSync(`${__dirname}/fixture/cty2jsonTest.cty`);
const base64 = file.toString('base64');
import cityDataCommonTest = require('./cityDataCommonTest');
const Cty2JSON = <Cty2JSONStatic>require('../../lib/cty2json.cjs');

const doc = new JSDOM(
  '<html><head></head><body></body></html>',
  {
  }
);

const win = doc.window;
const dataURLSch = `data:application/octet-binary;base64,${base64}`;

const xhr = new win.XMLHttpRequest();

xhr.onreadystatechange = function () {
  if (xhr.readyState === 4) {
    const json = Cty2JSON.analyze(xhr.response);
    const cityData = <cty2JSONDataFormat>JSON.parse(json);
    describe(
      'JSDOM Cty2JSON',
      function () {
        it(
          'Get City Budget',
          function () {
            cityDataCommonTest.checkMiscData(cityData);
          }
        )
      }
    )
  }
}

xhr.open('GET', dataURLSch);
xhr.responseType = 'arraybuffer';
xhr.send();