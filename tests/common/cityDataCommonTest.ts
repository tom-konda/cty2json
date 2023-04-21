import type { cty2JSONDataFormat } from '../../declaration/cty2json'
import { expect } from 'vitest';

const checkTileValue = [
  29, 623, 25, 31, 0,
];

export const checkHistoryData = (cityData: cty2JSONDataFormat): void => {
  expect(cityData.historyData['crime']['10years'][0]).toBe(0);
}

export const checkMiscData = (cityData: cty2JSONDataFormat): void => {
  expect(cityData.miscData.budget).toBe(10560);
}

export const checkTileData = (cityData: cty2JSONDataFormat): void => {
  const mapTile = cityData.tileData;
  const actualTileData = [
    mapTile[90][116].building,
    mapTile[91][115].building,
    mapTile[91][116].building,
    mapTile[91][117].building,
    mapTile[92][116].building,
  ];

  expect(actualTileData).toEqual(checkTileValue);
}