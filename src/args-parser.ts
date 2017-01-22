"use strict";

import * as Promise from "bluebird";
import * as program from "commander";
import * as _ from "lodash";

import { ArgsError } from "./errors";

export interface Options {
  serialPort: string;
  baudRate: number;
  vlcPort: number;
  password: string;
}

type OptionValue = string | number;

const nullOptions: Options = {
  serialPort: null,
  baudRate: 9600,
  vlcPort: 8080,
  password: null
};

function merge(
  target: OptionValue,
  source: OptionValue
): OptionValue {
  return _.isUndefined(source) ? target : source;
}

function parse(argv: string[]): Options {
  program
    .version("0.0.1")
    .option("-p, --password <string>", "VLC HTTP auth password")
    .option("-s, --serialPort <path>", "Serial Port")
    .option("-b, --baudRate <num>", "Baud Rate. Defaults to 9600", parseInt)
    .option("-v, --vlcPort <num>", "VLC HTTP Port. Defaults to 8080", parseInt)
    .parse(argv);

  return _.assignWith<Options>(nullOptions, program.opts(), merge);
}

export function validate(options: Options): Promise<Options> {
  return new Promise<Options>((resolve, reject) => {
    if (!options.serialPort) {
      return reject(
        new ArgsError("You must provide serial port. For help type 'npm start -- -h'")
      );
    }

    if (!options.password) {
      return reject(
        new ArgsError("You must provide vlc password. For help type 'npm start -- -h'")
      );
    }

    return resolve(options);
  });
}

export default function(
  argv: string[] = process.argv
): Promise<Options> {
  return validate(parse(argv));
}
