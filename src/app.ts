"use strict";

import * as SerialPort from "serialport";

import handler from "./handler";
import argsParser from "./args-parser";
import { logError } from "./logger";
import { ArgsError } from "./errors";

argsParser()
  .then(opts => {
    const port = new SerialPort(opts.serialPort, {
      baudRate: opts.baudRate
    });

    port.on("data", handler(opts.vlcPort, opts.password));
    port.on("error", logError);
  })
  .catch(ArgsError, logError);
