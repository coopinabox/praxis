var validator = require('checkit');
var promise = require('bluebird');

module.exports.validate = function (task) {

  var defer = promise.defer();

  validator(task).run({
    'name'     : ['maxLength:10'],//['required', 'maxLength:100'],
    'description' : [],//['required'],
  }).then(function(validator) {
    defer.fulfill(validator);
  }, function(err) {
    defer.reject(err.checkit.errors);
  });

  return defer.promise;
};
