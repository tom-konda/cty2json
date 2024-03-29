Cty2JSON: https://github.com/tom-konda/cty2json

[![Build Status](https://travis-ci.org/tom-konda/cty2json.svg?branch=master)](https://travis-ci.org/tom-konda/cty2json)


## About
This JavaScript library converts from .cty file (Micropolis format) to JSON.

## Support Browsers
- Firefox, Google Chrome
- MS Edge, Safari works probabry.


## Support Node.js versions

* Latest LTS

## Usage
### CLI
```bash
$ cty2json [options] <inputFile>
```

Options

```bash
    -h, --help                 output usage information
    -v, --version              output the version number
    -o, --output <outputFile>  Output JSON file
```

### Library
#### Browser (Legacy Style)

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <script src="../../lib/cty2json.js"></script>
    <script>
      'use strict';
      let xhr = new win.XMLHttpRequest();

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          let json = Cty2JSON.analyze(xhr.response);
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

#### Browser (ES Modules)

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import cty2JSON from './cty2json.js';
    
    fetch('./cty2jsonTest.cty')
    .then(
      (result) => {
        return result.arrayBuffer();
      }
    ).then(
      (buffer) => {
        const cityData = cty2JSON.analyze(buffer);
      }
    );
  </script>
</head>
</html>
```

#### Web worker

```js
importScripts('../../lib/cty2json.js');

self.addEventListener(
    'message',
    function(event){
        let cityData = event.data;
        self.postMessage(self.Cty2JSON.analyze(cityData));
        self.close();
    },
    false
);
```

#### Node.js

```js
const Cty2JSON = require('../../cty2json');

let file = fs.readFileSync(`PATH_TO_CTYFILE/test.cty`);

// Convert from buffer to Uint8Array
let uint8arr = new Uint8Array(file);
let json = Cty2JSON.analyze(uint8arr.buffer);
```

## Output Format
```
{
  fileSize : Integer,
  historyData : {
    residential: {
      "10years": [
        0-255, // 120 items
      ],
      "120years": [
        0-255, // 120 items
      ],
    },
    commercial: {
      "10years": [
        0-255, // 120 items
      ],
      "120years": [
        0-255, // 120 items
      ],
    },
    industrial: {
      "10years": [
        0-255, // 120 items
      ],
      "120years": [
        0-255, // 120 items
      ],
    },
    crime: {
      "10years": [
        0-255, // 120 items
      ],
      "120years": [
        0-255, // 120 items
      ],
    },
    pollution: {
      "10years": [
        0-255, // 120 items
      ],
      "120years": [
        0-255, // 120 items
      ],
    },
    landValue: {
      "10years": [
        0-255, // 120 items
      ],
      "120years": [
        0-255, // 120 items
      ],
    },
  },
  miscData : {
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
    transportCovered : 0-65536,
    soundOn : 0 or 1,
    tax : 0-20
  },
  tileDatas : [
    [
      {
        building : 0-1023,
        animated : Boolean,
        bulldozable : Boolean,
        combustible : Boolean,
        conductive : Boolean,
        zoneCenter : Boolean,
      }, {
      }, // 120 items
    ], [
    ], // 100 items
  ], 
}
```

## How to build

1. Clone the repo from github `git clone https://github.com/tom-konda/cty2json.git` 
2. Change current directory `cd cty2json` 
3. Run `npm install`
4. Run `npm run build`

## License
Licensed under the GPLv3

## Acknowledgement

- [MicropolisJ](https://github.com/jason17055/micropolis-java) for help to understand .cty file format.