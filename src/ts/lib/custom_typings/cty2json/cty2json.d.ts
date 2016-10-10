interface tileInterface {
  building : number,
  zoneCenter : number,
  animated : number,
  bulldozable : number,
  combustible : number,
  conductive : number,
}

interface cty2JSONDataFormat {
      fileSize: number,
      historyData: {[index: string]: number[]},
      miscData: {[index : string]:number},
      tileData: {}[][],
}

declare let Cty2JSON : Cty2JSONStatic;

interface Cty2JSONStatic{
  analyzeData (data:ArrayBuffer): string;
}

declare module 'cty2json' {
  export = Cty2JSON
}