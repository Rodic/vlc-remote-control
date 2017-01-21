"use strict";

import { expect } from "chai";

import parsePortData from "../../src/input-parser";

describe("inputParser", function() {
  context("when input buffer is empty string", function() {
    it("returns empty string", function() {
      expect(
        parsePortData(new Buffer(""))
      ).to.eq("");
    });
  });

  context("when input buffer doesn't end with new line or carriage return", function() {
    it("returns stripped string", function() {
      expect(
        parsePortData(new Buffer("test"))
      ).to.eq("test");
    });
  });

  context("when input buffer ends with new line", function() {
    it("returns stripped string", function() {
      expect(
        parsePortData(new Buffer("test\n"))
      ).to.eq("test");
    });
  });

  context("when input buffer ends with carriage return and new line", function() {
    it("returns stripped string", function() {
      expect(
        parsePortData(new Buffer("test\r\n"))
      ).to.eq("test");
    });
  });
});
