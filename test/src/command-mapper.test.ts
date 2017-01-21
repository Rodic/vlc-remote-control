"use strict";

import { expect } from "../helper";

import commandMapper from "../../src/command-mapper";
import { UnknownCommandError } from "../../src/errors";

describe("commandMapper", function() {
  context("when input command is valid", function() {
    it("maps '1' to play command", function() {
      return expect(
        commandMapper("1", 9090)
      ).to.eventually.eq(
        "http://localhost:9090/requests/status.xml?command=pl_play"
      );
    });

    it("maps '2' to stop command", function() {
      return expect(
        commandMapper("2", 9090)
      ).to.eventually.eq(
        "http://localhost:9090/requests/status.xml?command=pl_stop"
      );
    });

    it("maps '3' to pause command", function() {
      return expect(
        commandMapper("3", 9090)
      ).to.eventually.eq(
        "http://localhost:9090/requests/status.xml?command=pl_pause"
      );
    });
  });

  context("when input command is not valid", function() {
    it("throws the correct error", function() {
      return expect(
        commandMapper("invalid-input", 9090)
      ).to.be.rejectedWith(
        UnknownCommandError,
        "Unknown command: 'invalid-input'");
    });
  });
});
