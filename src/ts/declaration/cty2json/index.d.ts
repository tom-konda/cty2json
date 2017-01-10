interface tileInterface {
  building: number,
  zoneCenter: number,
  animated: number,
  bulldozable: number,
  combustible: number,
  conductive: number,
}

interface cty2JSONDataFormat {
  fileSize: number,
  historyData: { [index: string]: number[] },
  miscData: { [index: string]: number },
  tileData: tileInterface[][],
}

interface Cty2JSONStatic {
  analyzeData(data: ArrayBuffer): string;
}

declare const Cty2JSON: Cty2JSONStatic;

interface tileOutputFormat {
  building: number,
  zoneCenter: 0 | 1,
  animated: 0 | 1,
  bulldozable: 0 | 1,
  combustible: 0 | 1,
  conductive: 0 | 1,
}


interface Cty2JSONFileFormat {
  fileSize: number
  historyData: {
    res: number[],
    com: number[],
    ind: number[],
    cri: number[],
    pol: number[],
    val: number[],
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
        zoneCenter: number,
        animated: number,
        bulldozable: number,
        combustible: number,
        conductive: number,
      }
    ]
  ]
}