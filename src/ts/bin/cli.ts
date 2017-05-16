#!/usr/bin/env node
/*!
* Cty2JSON ver 0.9.0
* Copyright (C) 2017 Tom Konda
* Released under the GPLv3 license
* See https://www.gnu.org/licenses/gpl-3.0.en.html
*/
import commander = require('commander');
import fs = require('fs');
const Cty2JSON = <Cty2JSONStatic>require('../index');
const packageInfo = JSON.parse(fs.readFileSync('./package.json').toString());

const fileAccessCheck = (inputFile: string) => {
  return new Promise(
    (resolve, reject) => {
      let isfileReadable: number;
      if (typeof fs.constants === 'undefined') {
        // for Node 4.x
        isfileReadable = fs.R_OK;
      }
      else {
        isfileReadable = fs.constants.R_OK;
      }
      fs.access(
        inputFile,
        isfileReadable,
        (error) => {
          error ? reject(error) : resolve(inputFile);
        }
      );
    }
  );
}

const fileFormatCheck = (inputfile: string) => {
  return new Promise(
    (resolve, reject) => {
      const file = fs.readFileSync(inputfile);
      const uint8arr = new Uint8Array(file);
      let json = Cty2JSON.analyze(uint8arr.buffer);
      try {
        const ctyJSON = JSON.parse(json);
        resolve(ctyJSON);
      }
      catch (error) {
        reject(error);
      }
    }
  );
}

const outputJSON = (jsonObj: any, options: any) => {
  return new Promise(
    (resolve, reject) => {
      const JSONtext = JSON.stringify(jsonObj, null, '  ');
      const outputFile = options.output;
      if (outputFile) {
        fs.writeFile(
          outputFile,
          JSONtext,
          (error) => {
            error ? reject(error) : resolve(outputFile);
          }
        )
      }
      else {
        process.stdout.write(JSONtext);
        resolve();
      }
    }
  )
}

const convertCty2JSON = function (inputCTYFile: string, options: any) {
  fileAccessCheck(inputCTYFile)
    .then(
    fileFormatCheck,
    (error) => {
      console.error('Cannot Read File.');
      process.stderr.write(`${error.errno} : ${error.message}\n`);
      process.exit(error.errno);
    }
    ).then(
    (json) => outputJSON(json, options),
    (error: SyntaxError) => {
      console.error('This is wrong Micropolis cty file.');
      console.error(error);
      process.stderr.write(`${error.name} : ${error.message}\n`);
      process.exit(1);
    }
    ).then(
    (outputFile) => {
      outputFile ? process.stdout.write(`${outputFile} was created successfully.\n`) : null;
    },
    (error) => {
      console.error('Cannot write a JSON file.');
      process.stderr.write(`${error.errno} : ${error.message}\n`);
      process.exit(error.errno);
    }
    );
}

commander.version(packageInfo.version)
  .command('<inputFile>', 'Path to a Micropolis .cty file')
  .option('-o, --output <outputfile>', 'Output JSON file')
  .description('Output JSON File from a Micropolis cty file')
  .usage('[options] <inputfile>')
  .action(convertCty2JSON)
  .parse(process.argv);
