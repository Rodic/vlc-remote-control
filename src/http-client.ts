"use strict";

import * as Promise from "bluebird";
import * as rp from "request-promise";
import { RequestError, StatusCodeError } from "request-promise/errors";
import { parseString } from "xml2js";
import { XmlParsingError } from "./errors";

import { logInfo, logError } from "./logger";

type VlcState = "playing" | "stoped" | "paused";

interface VlcResponse {
  root: {
    state: VlcState[];
  };
}

export default function(
  options: rp.OptionsWithUrl
): Promise<void> {
  return rp(options)
    .then(state => logInfo(`VLC state: ${state}`))
    .catch(RequestError, logError)
    .catch(StatusCodeError, logError);
}

export function getVlcOptions(
  url: string,
  pass: string,
  transform: <T>(response: string) => T = parseVlcState
): rp.OptionsWithUrl {
  return {
    url: url,
    headers: {
      "Authorization": `Basic ${btoa(`:${pass}`)}`
    },
    transform: transform
  };
}

function btoa(input: string): string {
  return new Buffer(input).toString("base64");
}

export function parseVlcState(response: string): Promise<VlcState> {
  return new Promise<VlcState>((resolve, reject) => {
    return parseString(response, (error: Error, result: VlcResponse) => {
      if (error) {
        return reject(
          new XmlParsingError(`Invalid VLC response ${error.message}`)
        );
      }
      return resolve(result.root.state[0]);
    });
  });
}
