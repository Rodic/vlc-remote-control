"require strict";

import * as Promise from "bluebird";

import commandMapper from "./command-mapper";
import parsePortData from "./input-parser";
import { UnknownCommandError } from "./errors";

export default function(
  port: number
): (serialPortData: Buffer) => Promise<void> {
  return serialPortInput => {
    const rawCommand = parsePortData(serialPortInput);
    return commandMapper(rawCommand, port)
      .then(command => {
        console.log("VlcUrl: ", command);
      })
      .catch(UnknownCommandError, err => {
        console.log(err.message);
      });
  };
}
