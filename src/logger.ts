"use strict";

interface Logger {
  info: (message: string) => void;
  error: (message: string) => void;
}

const logger: Logger = require("eazy-logger").Logger({
  prefix: "{blue:[}{magenta:vlc-remote-control}{blue:] }",
  useLevelPrefixes: true
});

export function logInfo(message: string): void {
  logger.info(message);
}

export function logError(error: Error): void {
  logger.error(error.message);
}
