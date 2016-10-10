declare let Cty2JSON : Cty2JSONStatic;

interface Cty2JSONStatic{
  analyzeData (data:ArrayBuffer): string;
}

declare module 'cty2json' {
  export = Cty2JSON
}