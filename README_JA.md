Cty2JSON: https://github.com/tom-konda/cty2json

[![Build Status](https://travis-ci.org/tom-konda/cty2json.svg?branch=master)](https://travis-ci.org/tom-konda/cty2json)

## これは何？
Micropolisのcty形式のファイルをJavaScriptを使用して、JSONに変換します。

## 対応ブラウザ
- Firefox, Google Chrome で動作確認
- MS Edge, Safari も動くはず

## 対応 Node.js バージョン

* 最新の LTS

## 使い方
### CLI
```bash
$ cty2json [options] <inputFile>
```

オプション

```bash
    -h, --help                 ヘルプの出力
    -V, --version              バージョンの出力
    -o, --output <outputFile>  JSONファイルの出力
```

### ライブラリ
#### ブラウザ (従来からのスタイル)

```html:browser.html
<!DOCTYPE html>
<html>
  <head>
    <title>Demo</title>
    <script src="../../lib/cty2json.legacy.js"></script>
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

#### ブラウザ (ES Modules)

```html:es_modules.html
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

```js:worker.js
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

```js:node.js
const Cty2JSON = require('../../cty2json');

let file = fs.readFileSync(`PATH_TO_CTYFILE/test.cty`);

// Convert from buffer to Uint8Array
let uint8arr = new Uint8Array(file);
let json = Cty2JSON.analyze(uint8arr.buffer);
```

## 出力フォーマット
```
{
  fileSize : Integer,
  historyData : {
    residential: {
      "10years": [
        0-255, // 120 times
      ],
      "120years": [
        0-255, // 120 times
      ],
    },
    commercial: {
      "10years": [
        0-255, // 120 times
      ],
      "120years": [
        0-255, // 120 times
      ],
    },
    industrial: {
      "10years": [
        0-255, // 120 times
      ],
      "120years": [
        0-255, // 120 times
      ],
    },
    crime: {
      "10years": [
        0-255, // 120 times
      ],
      "120years": [
        0-255, // 120 times
      ],
    },
    pollution: {
      "10years": [
        0-255, // 120 times
      ],
      "120years": [
        0-255, // 120 times
      ],
    },
    landValue: {
      "10years": [
        0-255, // 120 times
      ],
      "120years": [
        0-255, // 120 times
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
  tileData : [
    [
      {
        building : 0-1023,
        animated : Boolean,
        bulldozable : Boolean,
        combustible : Boolean,
        conductive : Boolean,
        zoneCenter : Boolean,
      }, {
      }, // 120 times
    ], [
    ], // 100 times
  ], 
}
```

## ビルドの仕方

1. `git clone https://github.com/tom-konda/cty2json.git` を実行し、レポジトリをクローンします
2. `cd cty2json` でカレントディレクトリを変更します
3. `npm install` を実行します
4. `npm run build` を実行します


## ライセンス
ライセンスはGPLv3になります。

## 謝辞

- [MicropolisJ](https://github.com/jason17055/micropolis-java) ： ctyファイルのデータ構造の理解の助けになりました

