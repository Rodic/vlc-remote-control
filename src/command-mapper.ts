"require strict";

import * as Promise from "bluebird";

import { UnknownCommandError } from "../src/errors";

type VlcCommand = "pl_play" | "pl_stop" | "pl_pause";

interface Mapper {
  [key: string]: VlcCommand;
}

const host: string = "localhost";

const mapper: Mapper = {
  "1": "pl_play",
  "2": "pl_stop",
  "3": "pl_pause"
};

function generateUrl(vlcCommand: VlcCommand, port: number): string {
  return `http://${host}:${port}/requests/status.xml?command=${vlcCommand}`;
}

export default function(
  rawCommand: string,
  port: number
): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    if (rawCommand in mapper) {
      return resolve(generateUrl(mapper[rawCommand], port));
    }
    return reject(new UnknownCommandError(`Unknown command: '${rawCommand}'`));
  });
}
