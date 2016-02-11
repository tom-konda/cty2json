/*!
* Cty2JSON ver 0.2
* Copyright (C) 2015 Tom Konda
* Released under the GPLv3 license
* See https://www.gnu.org/licenses/gpl-3.0.en.html
*/
'use strict';

(function(global) {
  'use strict';
  const isNode = ('process' in global);

  let Cty2JSONAnalyzeData = function(data: ArrayBuffer): string {
    let x: number, y: number, tile: number;
    const SHORT_BYTE_LENGTH = 2,
      DEFAULT_WIDTH = 120,
      DEFAULT_HEIGHT = 100,
      SOME_EDITION_FILESIZE = 27120;
    let offset = 0;
    let cityData = {
      fileSize: 0,
      historyDatas: {},
      miscDatas: {},
      tileDatas: [],
    }
    if (data.byteLength > SOME_EDITION_FILESIZE) {
      // Set 128-byte offset because of following comment in Micropolis.java.
      // ref: https://github.com/jason17055/micropolis-java/blob/9f6ddb4b5f36a005fe4c4f77488d7969eabf0797/src/micropolisj/engine/Micropolis.java#L2254
      // some editions of the classic Simcity game
      // start the file off with a 128-byte header,
      // but otherwise use the same format as us,
      // so read in that 128-byte header and continue
      // as before.
      offset = 128;
    }

    cityData.fileSize = data.byteLength;
    const HISTORY_DATA_COUNT = 240,
      HISTORY_DATA_BYTE = HISTORY_DATA_COUNT * SHORT_BYTE_LENGTH;
    // Get history graph datas from city
    let getHistoryData = function(property) {
      let historyData = data.slice(offset, offset + HISTORY_DATA_BYTE);
      cityData.historyDatas[property] = [];
      for (let i = 0; i < HISTORY_DATA_COUNT; ++i) {
        cityData.historyDatas[property].push(new DataView(historyData, i * SHORT_BYTE_LENGTH, SHORT_BYTE_LENGTH).getInt16(0, false));
      }
      offset += HISTORY_DATA_BYTE;
    };
    cityData.historyDatas = {};
    getHistoryData('res');
    getHistoryData('com');
    getHistoryData('ind');
    getHistoryData('cri');
    getHistoryData('pol');
    getHistoryData('val');
    const MISC_DATA_COUNT = 120,
      MISC_DATA_BYTE = MISC_DATA_COUNT * SHORT_BYTE_LENGTH;
    let miscData = data.slice(offset, offset + MISC_DATA_BYTE);
    offset += MISC_DATA_BYTE;
    cityData.miscDatas = {};
    let getMiscData = (property: string, miscOffset: number, length: number) => {
      let sum = 0;
      for (let i = 0, cnt = length; i < cnt; ++i) {
        if (i !== 0) {
          sum <<= 16;
        }
        sum += new DataView(miscData, (miscOffset + i) * SHORT_BYTE_LENGTH, SHORT_BYTE_LENGTH).getInt16(0, false);
      }
      cityData.miscDatas[property] = sum;
    };
    getMiscData('RPopulation', 2, 1);
    getMiscData('CPopulation', 3, 1);
    getMiscData('IPopulation', 4, 1);
    getMiscData('RValve', 5, 1);
    getMiscData('CValve', 6, 1);
    getMiscData('IValve', 7, 1);
    getMiscData('cityTime', 8, 2);
    getMiscData('crimeRamp', 10, 1);
    getMiscData('polluteRamp', 11, 1);
    getMiscData('landValueAve', 12, 1);
    getMiscData('crimeAve', 13, 1);
    getMiscData('pollutionAve', 14, 1);
    getMiscData('gameLevel', 15, 1);
    getMiscData('cityClass', 16, 1);
    getMiscData('cityScore', 17, 1);
    getMiscData('budget', 50, 2);
    getMiscData('autoBulldoze', 52, 1);
    getMiscData('autoBudget', 53, 1);
    getMiscData('autoGoto', 54, 1);
    getMiscData('soundOn', 55, 1);
    getMiscData('tax', 56, 1);
    getMiscData('gameSpeed', 57, 1);
    // Following three values are ratio of n to 65536
    getMiscData('policeCovered', 58, 2);
    getMiscData('fireCovered', 60, 2);
    getMiscData('roadCovered', 62, 2);
    miscData = null;
    const MAP_DATA_COUNT = DEFAULT_WIDTH * DEFAULT_HEIGHT;
    const MAP_DATA_BYTE = MAP_DATA_COUNT * SHORT_BYTE_LENGTH;
    let tileData = data.slice(offset, offset + MAP_DATA_BYTE);

    // Get Tile Data
    for (y = 0; y < DEFAULT_HEIGHT; ++y) {
      cityData.tileDatas[y] = [];
      for (x = 0; x < DEFAULT_WIDTH; ++x) {
        tile = new DataView(tileData, (x * DEFAULT_HEIGHT + y) * SHORT_BYTE_LENGTH, SHORT_BYTE_LENGTH).getInt16(0, false);
        cityData.tileDatas[y][x] = {};
        cityData.tileDatas[y][x].building = tile & 1023;
        cityData.tileDatas[y][x].zoneCenter = tile >> 10 & 1;
        cityData.tileDatas[y][x].animated = tile >> 11 & 1;
        cityData.tileDatas[y][x].bulldozable = tile >> 12 & 1;
        cityData.tileDatas[y][x].combustible = tile >> 13 & 1;
        cityData.tileDatas[y][x].conductive = tile >> 14 & 1;
      }
    }
    return JSON.stringify(cityData, null, 2);
  }

  let _Cty2JSON: Cty2JSONStatic = {
    analyzeData: Cty2JSONAnalyzeData,
  }

  if (isNode) {
    module.exports = _Cty2JSON;
  }
  global.Cty2JSON = _Cty2JSON;

})((this || 0).self || global);