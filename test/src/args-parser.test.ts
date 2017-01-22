"use strice";

import { expect } from "../helper";

import { validate } from "../../src/args-parser";
import { ArgsError } from "../../src/errors";

describe("validate", function() {
  describe("serialPort", function() {
    context("when is present", function() {
      it("validates", function() {
        return expect(
          validate({
            serialPort: "/dev/ttyS0",
            password: "test",
          } as any)
        ).to.eventually.have.property(
          "serialPort",
          "/dev/ttyS0"
        );
      });
    });

    context("when is not present", function() {
      it("throws the correct error", function() {
        return expect(
          validate({
            password: "test",
          } as any)
        ).to.be.rejectedWith(
          ArgsError,
          "You must provide serial port. For help type 'npm start -- -h'"
        );
      });
    });
  });

  describe("password", function() {
    context("when is present", function() {
      it("validates", function() {
        return expect(
          validate({
            serialPort: "/dev/ttyS0",
            password: "test",
          } as any)
        ).to.eventually.have.property(
          "password",
          "test"
        );
      });
    });

    context("when is not present", function() {
      it("the correct error", function() {
        return expect(
          validate({
            serialPort: "/dev/ttyS0",
          } as any)
        ).to.be.rejectedWith(
          ArgsError,
          "You must provide vlc password. For help type 'npm start -- -h'"
        );
      });
    });
  });
});
