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