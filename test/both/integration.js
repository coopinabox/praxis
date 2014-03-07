"use strict";

var phantom = require('phantom');
var expect = require('chai').expect;

describe("CRUD tasks", function () {
  var client, server;

  before(function (done) {
    phantom.create(function (ph) {
      ph.createPage(function (tab) {
        client = tab;
        server = require('../../lib/server');
        server.listen(4000, function () {
          done();
        });
      });
    });
  });

  it("should return return page", function (done) {
    client.open('http://localhost:4000/', function (status) {
      client.evaluate(function () {
        return "apple";
      }, function (result) {
        expect(result).to.equal("apple");
        done();
      });
    });
  });
});
