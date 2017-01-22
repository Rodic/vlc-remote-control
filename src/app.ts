"use strict";

import * as SerialPort from "serialport";

import handler from "./handler";
import { logError } from "./logger";

// TODO read from command line

const portPath: string = "/dev/pts/4";
const baudRate: number = 9600;
const vlcPort: number = 8080;
const vlcPass: string = "test";

const port = new SerialPort(portPath, {
  baudRate: baudRate
});

port.on("data", handler(vlcPort, vlcPass));
port.on("error", logError);
