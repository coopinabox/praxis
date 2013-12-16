"use strict";

var should = require('should');

var TaskList = require('tasks/TaskList.server');

describe("TaskList", function () {
  var taskList = new TaskList();

  describe(".create", function () {
    beforeEach(function () {
      taskList.reset();
    });

    it("should create valid tasks", function (done) {
      taskList.create({
        'name': 'valid_name',
        'description': 'valid_description',
      }).then(function (task) {
        task.id
          .should.be.type('number');
        task.get('name')
          .should.be.type('string')
          .and.equal('valid_name');
        task.get('description')
          .should.be.type('string')
          .and.equal('valid_description');
        done();
      });
    });

    it("should not allow invalid data", function (done) {
      taskList.create({
        "name": "areallylongnamethatissolong",
        "description": "valid_description",
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

