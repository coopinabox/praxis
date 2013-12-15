"use strict";

var should = require('should');

var taskDir = '../../src/tasks/';

var Collection = require(taskDir + '/collection.server');

describe("Collection", function () {
  var collection = new Collection();
  beforeEach(function () {
    collection.reset();
  });
  describe(".create", function () {
    it("has correct defaults", function (done) {
      collection.create({}).then(function (model) {
        model.id
          .should.be.type('number');
        model.get('name')
          .should.be.type('string')
          .and.equal('');
        model.get('description')
          .should.be.type('string')
          .and.equal('');
        done();
      });
    });
  });
});

