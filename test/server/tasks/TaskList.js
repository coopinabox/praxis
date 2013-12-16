"use strict";

var should = require('should');

var taskDir = '../../../src/tasks';

var TaskList = require(taskDir + '/TaskList.server');

describe("TaskList", function () {
  var taskList = new TaskList();

  describe(".create", function () {
    beforeEach(function () {
      taskList.reset();
    });
    it("should have correct defaults", function (done) {
      taskList.create({}).then(function (task) {
        task.id
          .should.be.type('number');
        task.get('name')
          .should.be.type('string')
          .and.equal('');
        task.get('description')
          .should.be.type('string')
          .and.equal('');
        done();
      });
    });
    it("should not allow invalid data", function (done) {
      taskList.create({
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

