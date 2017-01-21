"use strict";

export default function(buffer: Buffer): string {
  return buffer.toString("utf8").trim();
}
