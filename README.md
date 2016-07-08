Cty2JSON: https://github.com/tom-konda/cty2json

## About
This JavaScript library converts from .cty file ( Micropolis format ) to JSON.

##Support Browsers
* Firefox, Chromium
* IE 11, Google Chrome, Opera and Safari maybe works well.

##Usage
### CLI
```bash
$ cty2json [options] <inputfile>
```

Options

```bash
    -h, --help                 output usage information
    -V, --version              output the version number
    -o, --output <outputfile>  Output JSON file
```

### Library
#### Browser

```html:browser.html
<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <script src="../../dist/cty2json.js"></script>
    <script>
      'use strict';
      let xhr = new win.XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          let json = Cty2JSON.analyzeData(xhr.response);
          let cityData = JSON.parse(json);
        }
      }

      xhr.open('GET', dataURLSch);
      xhr.responseType = 'arraybuffer';
      xhr.send();
    </script>
  </head>
</html>
```

#### Web worker

```js:worker.js
importScripts('../../dist/cty2json.js');

self.addEventListener(
    'message',
    function(event){
        let cityData = event.data;
        self.postMessage(self.Cty2JSON.analyzeData(cityData));
        self.close();
    },
    false
);
```

#### Node.js

```js:node.js
require('../../dist/cty2json');

let file = fs.readFileSync(`PATH_TO_CTYFILE/test.cty`);

// Convert from buffer to Uint8Array
let uint8arr = new Uint8Array(file);
let json = Cty2JSON.analyzeData(uint8arr.buffer);
```

##Output Format
```
{
  fileSize : Integer,
  historyDatas : {
    com : [
      0-255, // 240 times
    ],
    cri : [
      0-255, // 240 times
    ],
    ind : [
      0-255, // 240 times
    ],
    pol : [
      0-255, // 240 times
    ],
    res : [
      0-255, // 240 times
    ],
    val : [
      0-255, // 240 times
    ],
  },
  miscDatas : {
    CPopulation : Integer,
    CValve : Integer,
    IPopulation : Integer,
    IValve : Integer,
    RPopulation : Integer,
    RValve : Integer,
    autoBudget : 0 or 1,
    autoBulldoze : 0 or 1,
    autoGoto : 0 or 1,
    budget : 0 or 1,
    cityClass : Integer,
    cityScore : Integer,
    cityTime : Integer,
    crimeAve : Integer,
    crimeRamp : Integer,
    fireCovered : 0-65536,
    gameLevel : 0-2,
    gameSpeed : 0-4,
    landValueAve : Integer,
    policeCovered : 0-65536,
    polluteRamp : Integer,
    pollutionAve : Integer,
    roadCovered : 0-65536,
    soundOn : 0 or 1,
    tax : 0-20
  },
  tileDatas : [
    [
      {
        animated : 0 or 1,
        building : 0-1023,
        bulldozable : 0 or 1,
        combustible : 0 or 1,
        conductive : 0 or 1,
        zoneCenter : 0 or 1
      }, {
      }, // 120 times
    ], [
    ], // 100 times
  ], 
}
```

##License
Licensed under the GPLv3
