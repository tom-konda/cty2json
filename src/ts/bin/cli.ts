import commander = require('commander');
const promisify = require('util.promisify');
import fs = require('fs');
const Cty2JSON = <Cty2JSONStatic>require('../index');
const packageInfo = JSON.parse(fs.readFileSync('./package.json').toString());

const fileAccessCheck = (inputFile: string) => {
  let isfileReadable: number;
  if (typeof fs.constants === 'undefined') {
    // for Node 4.x
    isfileReadable = fs.R_OK;
  }
  else {
    isfileReadable = fs.constants.R_OK;
  }
  return promisify(fs.access)(inputFile, isfileReadable);
}

const fileFormatCheck = (inputfile: Buffer) => {
  const uint8arr = new Uint8Array(inputfile);
  try {
    const ctyData = Cty2JSON.outputJSONText(uint8arr.buffer as ArrayBuffer);
    return Promise.resolve(ctyData);
  }
  catch (error) {
    return Promise.reject(error);
  }
}

const convertCty2JSON = async (inputCTYFile: string, options: any) => {
  try {
    await fileAccessCheck(inputCTYFile);
    const file = await promisify(fs.readFile)(inputCTYFile);
    const JSONText = await fileFormatCheck(file);
    const outputFile = options.output;
    if (outputFile) {
      await promisify(fs.writeFile)(outputFile, JSONText);
      process.stdout.write(`${outputFile} was created successfully.\n`);
    }
    else {
      process.stdout.write(JSONText);
    }
  }
  catch(error) {
    console.log(error);
    console.error('Cannot write a JSON file.');
    if(error instanceof RangeError) {
      process.stderr.write(`-1 : ${error.message}\n`);
      process.exit(-1);
    }
    else if (error as NodeJS.ErrnoException instanceof Error) {
      process.stderr.write(`${error.errno} : ${error.message}\n`);
      process.exit(error.errno);
    }
  }
}

commander.version(packageInfo.version)
  .command('<inputFile>', 'Path to a Micropolis .cty file')
  .option('-o, --output <outputFile>', 'Output JSON file')
  .description('Output JSON File from a Micropolis cty file')
  .usage('[options] <inputFile>')
  .action(convertCty2JSON)
  .parse(process.argv);
