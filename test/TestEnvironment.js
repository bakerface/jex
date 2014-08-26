"use strict";

(function() {
  var root = this;
  var previous = root.previous;
  var TestEnvironment = { };

  TestEnvironment.add = function(environment, expression, input, success, failure) {
    return success(environment, input + expression.add);
  };

  TestEnvironment.multiply = function(environment, expression, input, success, failure) {
    return success(environment, input * expression.multiply);
  };

  TestEnvironment.less = function(environment, expression, input, success, failure) {
    if (input < expression.less) {
      return success(environment, input);
    }
    else {
      return failure(environment, input);
    }
  };

  TestEnvironment.log = function(environment, expression, input, success, failure) {
    console.log(expression.log);
    return success(environment, input);
  };

  TestEnvironment.conflict = function() {
    root.TestEnvironment = previous;
    return TestEnvironment;
  };

  if (typeof(exports) !== "undefined") {
    if (typeof(module) !== "undefined") {
      exports = module.exports = TestEnvironment;
    }

    exports.TestEnvironment = TestEnvironment;
  }
  else {
    root.TestEnvironment = TestEnvironment;
  }

}).call(this);
