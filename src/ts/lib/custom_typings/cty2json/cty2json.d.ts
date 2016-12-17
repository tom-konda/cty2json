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
    tileData: { [index: number]: tileInterface[] },
}

interface Cty2JSONStatic {
    analyzeData(data: ArrayBuffer): string;
}

declare const Cty2JSON: Cty2JSONStatic;