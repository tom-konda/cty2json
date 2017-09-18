interface tileInterface {
  building: number,
  zoneCenter: boolean,
  animated: boolean,
  bulldozable: boolean,
  combustible: boolean,
  conductive: boolean,
}

interface cty2JSONDataFormat {
  fileSize: number,
  historyData: {
    [index: string]: historyGraphData,
  },
  miscData: { [index: string]: number },
  tileData: tileInterface[][],
}

interface Cty2JSONStatic {
  analyze(data: ArrayBuffer): cty2JSONDataFormat;
  outputJSONText(data: ArrayBuffer): string;
}

declare const Cty2JSON: Cty2JSONStatic;
declare module 'cty2json' {
  export = Cty2JSON;
}

interface historyGraphData {
  '10years': number[],
  '120years': number[],
}

interface Cty2JSONFileDetailFormat {
  fileSize: number
  historyData: {
    residential: historyGraphData,
    commercial: historyGraphData,
    industrial: historyGraphData,
    crime: historyGraphData,
    pollution: historyGraphData,
    landValue: historyGraphData,
  },
  miscData: {
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
  },
  tileData: [
    [
      {
        building: number,
        zoneCenter: boolean,
        animated: boolean,
        bulldozable: boolean,
        combustible: boolean,
        conductive: boolean,
      }
    ]
  ]
}