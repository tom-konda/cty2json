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
    [index: string]: {
      "10years": number[],
      "120years": number[],
    }
  },
  miscData: { [index: string]: number },
  tileData: tileInterface[][],
}

interface Cty2JSONStatic {
  analyzeData(data: ArrayBuffer): string;
  analyze(data: ArrayBuffer): string;
}

declare const Cty2JSON: Cty2JSONStatic;

interface Cty2JSONFileDetailFormat {
  fileSize: number
  historyData: {
    residential: {
      "10years": number[],
      "120years": number[],
    },
    commericial: {
      "10years": number[],
      "120years": number[],
    },
    industrial: {
      "10years": number[],
      "120years": number[],
    },
    crime: {
      "10years": number[],
      "120years": number[],
    },
    pollution: {
      "10years": number[],
      "120years": number[],
    },
    landValue: {
      "10years": number[],
      "120years": number[],
    },
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