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
    it("should have correct defaults", function (done) {
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
    it("should not allow invalid data", function (done) {
      collection.create({
        "name": "areallylongnamethatissolong",
        "description": "",
      }).then(function (data) {
        false.should.be.ok;
      }).catch(function (error) {
        should.exist(error);
        error.name.should.equal("Name must be at most 10 characters");
        done();
      });
    });
  });
});

