import assert = require('power-assert');

export const checkCityData = (cityData: any) => {
  assert.deepEqual(cityData.miscData.budget, 10560, 'File is not analyzed correctly.');
}