"require strict";

import * as Promise from "bluebird";

import commandMapper from "./command-mapper";
import parseSerialPortInput from "./input-parser";
import get, { getVlcOptions } from "./http-client";
import { UnknownCommandError, XmlParsingError } from "./errors";

import { logError } from "./logger";

export default function(
  port: number,
  pass: string
): (serialPortInput: Buffer) => Promise<void> {
  return serialPortInput => {
    const rawCommand = parseSerialPortInput(serialPortInput);
    return commandMapper(rawCommand, port)
      .then(uri => {
        const options = getVlcOptions(uri, pass);
        return get(options);
      })
      .catch(UnknownCommandError, logError)
      .catch(XmlParsingError, logError);
  };
}
