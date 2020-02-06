import * as commander from 'commander';
import {constants as fsConstants, promises as fsPromises, readFileSync} from 'fs';
const Cty2JSON = require('../index') as Cty2JSONStatic;
const packageInfo = JSON.parse(readFileSync(`${__dirname}/../package.json`).toString());

const fileAccessCheck = (inputFile: string) => {
  return fsPromises.access(inputFile, fsConstants.R_OK);
}

const fileFormatCheck = (inputFile: Buffer) => {
  const uint8arr = new Uint8Array(inputFile);
  try {
    const ctyData = Cty2JSON.outputJSONText(uint8arr.buffer as ArrayBuffer);
    return Promise.resolve(ctyData);
  }
  catch (error) {
    return Promise.reject(error);
  }
}

const convertCty2JSON = async(inputFile: string, options: {output: string}) => {
  try {
    await fileAccessCheck(inputFile);
    const file = await fsPromises.readFile(inputFile);
    const JSONText = await fileFormatCheck(file);
    const outputFile = options.output;
    if (outputFile) {
      await fsPromises.writeFile(outputFile, JSONText);
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
