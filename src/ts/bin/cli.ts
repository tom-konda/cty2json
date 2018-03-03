import commander = require('commander');
import {promisify} from 'util';
import fs = require('fs');
const Cty2JSON = <Cty2JSONStatic>require('../index');
const packageInfo = JSON.parse(fs.readFileSync('./package.json').toString());

const fileAccessCheck = (inputFile: string) => {
  return promisify(fs.access)(inputFile, fs.constants.R_OK);
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
