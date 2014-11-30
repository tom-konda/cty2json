/*!
* Cty2JSON ver 0.1
* Copyright (C) 2014 Tom Konda
* Released under the GPLv3 license
* See https://www.gnu.org/licenses/gpl-3.0.en.html
*/

// Get Message From Worker
self.addEventListener(
    'message',
    function(event){
        var cityData = event.data;
        self.postMessage(Cty2JSON.analyzeData(cityData));
        self.close();
    },
    false
);


// Convert cty File to JSON
var Cty2JSON = {
    analyzeData : function(data) {
        var i, x, y, tile;
        var SHORT_BYTE_LENGTH = 2,
            DEFAULT_WIDTH = 120,
            DEFAULT_HEIGHT = 100,
            cityData = {},
            offset = 0;
        if(data.byteLength > 27120){
            // Micropolis.java によると以下の記述があるため、128バイト飛ばす
            
            // some editions of the classic Simcity game
			// start the file off with a 128-byte header,
			// but otherwise use the same format as us,
			// so read in that 128-byte header and continue
			// as before.
            offset = 128;
        }
        
        var buffer = new Int16Array(data);
        cityData.fileSize = data.byteLength;
        
        // 都市のグラフのデータ取得
        var getHistoryData = function(property){
            var i, cnt;
            var HISTORY_DATA_COUNT = 240,
                HISTORY_DATA_BYTE = HISTORY_DATA_COUNT * SHORT_BYTE_LENGTH;
            var historyData = data.slice(offset, offset + HISTORY_DATA_BYTE);
            cityData.historyDatas[property] = [];
            for(i = 0, cnt = HISTORY_DATA_COUNT; i < cnt; ++i){
                cityData.historyDatas[property].push(new DataView(historyData, i * SHORT_BYTE_LENGTH, SHORT_BYTE_LENGTH).getInt16(0));
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
        
        var MISC_DATA_COUNT = 120,
            MISC_DATA_BYTE = MISC_DATA_COUNT * SHORT_BYTE_LENGTH;
        var miscData = data.slice(offset, offset + MISC_DATA_BYTE);
        offset += MISC_DATA_BYTE;
        
        cityData.miscDatas = {};
        cityData.miscDatas.rawData = miscData;
        var getMiscData = function(property, miscOffset, length){
            var i, cnt;
            var sum = 0;
            for(i = 0, cnt = length; i < cnt; ++i){
                if(i !== 0){
                    sum <<= 16;
                }
                sum += new DataView(miscData, (miscOffset + i) * SHORT_BYTE_LENGTH, SHORT_BYTE_LENGTH).getInt16(0);
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
        
        // 以下の3つは 65536分率
        getMiscData('policeCovered', 58, 2);
        getMiscData('fireCovered', 60, 2);
        getMiscData('roadCovered', 62, 2);
        miscData = null;
        
        var MAP_DATA_COUNT = DEFAULT_WIDTH * DEFAULT_HEIGHT;
        var MAP_DATA_BYTE = MAP_DATA_COUNT * SHORT_BYTE_LENGTH;
        var tileData = data.slice(offset, offset + MAP_DATA_BYTE);
        map = Array(DEFAULT_HEIGHT);
        
        // タイルデータの取得
        for(y = 0; y < DEFAULT_HEIGHT; ++y){
            map[y] = new Array(DEFAULT_WIDTH);
            for(x = 0; x < DEFAULT_WIDTH; ++x){
                tile = new DataView(tileData, (x * DEFAULT_HEIGHT + y) * SHORT_BYTE_LENGTH, SHORT_BYTE_LENGTH).getInt16(0);
                map[y][x] = {};
                map[y][x].building = tile & 1023;
                map[y][x].zoneCenter = ( tile >> 10 ) & true;
                map[y][x].animated = ( tile >> 11 ) & true;
                map[y][x].bulldozable = ( tile >> 12 ) & true;
                map[y][x].combustible = ( tile >> 13 ) & true;
                map[y][x].conductive = ( tile >> 14 ) & true;
            }
        }
        cityData.tileDatas = map;
        return JSON.stringify(cityData);
    }
};
