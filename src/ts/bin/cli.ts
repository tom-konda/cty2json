import { program } from 'commander';
import {constants as fsConstants, readFileSync} from 'fs';
import { access, readFile, writeFile } from 'fs/promises';
import {outputJSONText} from '../lib/cty2json';

import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const packageInfo = JSON.parse(readFileSync(`${__dirname}/../package.json`).toString());

const fileAccessCheck = (inputFile: string) => {
  return access(inputFile, fsConstants.R_OK);
}

const fileFormatCheck = (inputFile: Buffer) => {
  const uint8arr = new Uint8Array(inputFile);
  try {
    const ctyData = outputJSONText(uint8arr.buffer as ArrayBuffer);
    return Promise.resolve(ctyData);
  }
  catch (error) {
    return Promise.reject(error);
  }
}

const convertCty2JSON = (...args: [string, {output: string}]) => {
  const [inputFile, options] = args;
  try {
    const fileConversion = async() => {
      await fileAccessCheck(inputFile);
      const file = await readFile(inputFile);
      const JSONText = await fileFormatCheck(file);
      const outputFile = options.output;
      await writeFile(outputFile, JSONText);
      process.stdout.write(`${outputFile} was created successfully.\n`);
    }
    fileConversion();
  }
  catch(error) {
    console.log(error);
    console.error('Cannot write a JSON file.');
    if(error instanceof RangeError) {
      process.stderr.write(`-1 : ${error.message}\n`);
      process.exit(-1);
    }
    else if (error instanceof Error) {
      process.stderr.write(`${(<NodeJS.ErrnoException>error).errno} : ${error.message}\n`);
      process.exit((<NodeJS.ErrnoException>error).errno);
    }
  }
}

async function main() {
  program.version(packageInfo.version, '-v, --version', 'Output the current version')
    .arguments('<inputFile>')
    .requiredOption('-o, --output <outputFile>', 'Output JSON file')
    .description('Output JSON from a Micropolis cty file')
    .usage('[options] <inputFile>')
    .action(convertCty2JSON);
  return await program.parseAsync();
}

main();
