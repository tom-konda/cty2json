import assert = require('assert');
const checkTileValue = [
  29, 623, 25, 31, 0,
];

const defaultMessages = {
  'history': 'History Data order need to be chronological order.',
  'misc': 'Misc data is not analyzed correctly.',
  'tile': 'Tile data is not analyzed correctly.',
}

export const checkHistoryData = (cityData: cty2JSONDataFormat, message: string = defaultMessages.history): void => {
  assert.deepEqual(cityData.historyData['crime']['10years'][0], 0, message);
}

export const checkMiscData = (cityData: cty2JSONDataFormat, message: string = defaultMessages.misc): void => {
  assert.deepEqual(cityData.miscData.budget, 10560, message);
}

export const checkTileData = (cityData: cty2JSONDataFormat, message: string = defaultMessages.tile): void => {
  const mapTile = cityData.tileData;
  const actualTileData = [
    mapTile[90][116].building,
    mapTile[91][115].building,
    mapTile[91][116].building,
    mapTile[91][117].building,
    mapTile[92][116].building,
  ];

  assert.deepEqual(actualTileData, checkTileValue, message);
}