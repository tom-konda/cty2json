'use strict';

import * as jsdom from 'jsdom';
let FileAPI = require('file-api');
let fs = require('fs');
let file = fs.readFileSync(`${__dirname}/fixture/cty2jsonTest.cty`);
let base64 = file.toString('base64');
let powAssert = require('power-assert');
require('../../dist/cty2json');

let doc = jsdom.jsdom(
  '<html><head></head><body></body></html>',
  {
  }
);

let win = doc.defaultView;
let dataURLSch = `data:application/octet-binary;base64,${base64}`;

let xhr = new win.XMLHttpRequest();

xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    let json = Cty2JSON.analyzeData(xhr.response);
    let cityData = JSON.parse(json);
    describe(
      'jsDomcty2json',
      function () {
        it(
          'fileSize',
          function () {
            powAssert.deepEqual(cityData.fileSize ,27120, 'File Size is not matched.');
          }
        )
      }
    )
  }
}

xhr.open('GET', dataURLSch);
xhr.responseType = 'arraybuffer';
xhr.send();