#!/usr/bin/env node
/*!
* Cty2JSON ver 0.3
* Copyright (C) 2016 Tom Konda
* Released under the GPLv3 license
* See https://www.gnu.org/licenses/gpl-3.0.en.html
*/
require('../dist/cty2json.js');
import commander = require('commander');
import fs = require('fs');

const fileAccessCheck = (inputFile:string) => {
  return new Promise(
    (resolve, reject) => {
      fs.access(
        inputFile,
        fs.R_OK,
        (error) => {
          error ? reject(error) : resolve(inputFile);
        }
      );
    }
  );
}

const fileFormatCheck = (inputfile:string) => {
  return new Promise(
    (resolve, reject) => {
      const file = fs.readFileSync(inputfile);
      const uint8arr = new Uint8Array(file);
      let json = Cty2JSON.analyzeData(uint8arr.buffer);
      try {
        const ctyJSON = JSON.parse(json);
        resolve(ctyJSON);
      } catch (error) {
        reject(error);
      }
    }
  );
}

const outputJSON = (jsonObj:any, options:any) => {
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

const convertCty2JSON = function (inputCTYFile:string, options:any) {
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
      (error:SyntaxError) => {
        console.error('This is wrong Micropolis cty file.');
        console.error(error);
        process.stderr.write(`${error.name} : ${error.message}\n`);
        process.exit(1);
      }
    ).then(
      (outputFile) => {
        outputFile ? process.stdout.write(`${outputFile} was created successfully.`) : null;
      },
      (error) => {
        console.error('Cannot write a JSON file.');
        process.stderr.write(`${error.errno} : ${error.message}\n`);
        process.exit(error.errno);
      }
    );
}


commander.version('0.3.0')
  .command('<inputFile>', 'Path to a Micropolis .cty file')
  .option('-o, --output <outputfile>', 'Output JSON file')
  .description('Output JSON File from a Micropolis cty file')
  .usage('[options] <inputfile>')
  .action(convertCty2JSON)
  .parse(process.argv);
