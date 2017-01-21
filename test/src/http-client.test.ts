"use strict";

import { expect } from "../helper";

import { XmlParsingError } from "../../src/errors";
import { getVlcOptions, parseVlcState } from "../../src/http-client";

describe("getVlcOptions", function() {
  describe("url", function() {
    it("assigns passed url", function() {
      expect(
        getVlcOptions("http://localhost:8080", "secret")
      ).to.have.property("url", "http://localhost:8080");
    });
  });

  describe("headers.Authorization", function() {
    it("assigns password encoded in base64", function() {
      expect(
        getVlcOptions("http://localhost:8080", "secret")
      ).to.have.deep.property("headers.Authorization", "Basic OnNlY3JldA==");
    });
  });
});

describe("parseVlcStatus", function() {
  context("when valid xml is present", function() {
    const xml: string = "<root><state>playing</state></root>";
    return expect(
      parseVlcState(xml)
    ).to.become("playing");
  });

  context("when invalid xml is present", function() {
    return expect(
      parseVlcState("gibberish")
    ).to.be.rejectedWith(XmlParsingError, "Invalid VLC response");
  });
});
