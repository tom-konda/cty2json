type cty2JSONDataFormat = {
  fileSize: number,
  historyData: historyData,
  miscData: miscData,
  tileData: tileData[][],
}

type Cty2JSONStatic = {
  analyze(data: ArrayBuffer): cty2JSONDataFormat;
  outputJSONText(data: ArrayBuffer): string;
}

type tileData = {
  building: number,
  zoneCenter: boolean,
  animated: boolean,
  bulldozable: boolean,
  combustible: boolean,
  conductive: boolean,
}

type historyData = {
  residential: historyGraphData,
  commercial: historyGraphData,
  industrial: historyGraphData,
  crime: historyGraphData,
  pollution: historyGraphData,
  landValue: historyGraphData,
}

type historyGraphData = {
  '10years': number[],
  '120years': number[],
}

type miscData = {
  RPopulation: number,
  CPopulation: number,
  IPopulation: number,
  RValve: number,
  CValve: number,
  IValve: number,
  cityTime: number,
  crimeRamp: number,
  polluteRamp: number,
  landValueAve: number,
  crimeAve: number,
  pollutionAve: number,
  gameLevel: number,
  cityClass: number,
  cityScore: number,
  budget: number,
  autoBulldoze: number,
  autoBudget: number,
  autoGoto: number,
  soundOn: number,
  tax: number,
  gameSpeed: number,
  policeCovered: number,
  fireCovered: number,
  transportCovered: number
}

declare const Cty2JSON: Cty2JSONStatic;
declare module '@tom-konda/cty2json' {
  export = Cty2JSON;
}