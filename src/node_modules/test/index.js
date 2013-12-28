require("mocha-as-promised")();

var chai = require('chai');
chai.use(require('chai-as-promised'));

var expect = chai.expect;

module.exports = {
  chai: chai,
  expect: expect,
}