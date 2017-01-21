"require strict";

import * as Promise from "bluebird";

import commandMapper from "./command-mapper";
import parseSerialPortInput from "./input-parser";
import get, { getVlcOptions } from "./http-client";
import { UnknownCommandError, XmlParsingError } from "./errors";

export default function(
  port: number,
  pass: string
): (serialPortData: Buffer) => Promise<void> {
  return serialPortInput => {
    const rawCommand = parseSerialPortInput(serialPortInput);
    // TODO use proper logger
    return commandMapper(rawCommand, port)
      .then(uri => {
        const options = getVlcOptions(uri, pass);
        return get(options);
      })
      .catch(UnknownCommandError, err => {
        console.log(err.message);
      })
      .catch(XmlParsingError, err => {
        console.log(err.message);
      });
  };
}
