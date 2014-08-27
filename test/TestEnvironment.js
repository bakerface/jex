"use strict";

(function() {
  var root = this;
  var previous = root.previous;
  var TestEnvironment = { };

  TestEnvironment.add = function(environment, expression, input, success, failure) {
    return environment.start(success, input + expression.add);
  };

  TestEnvironment.multiply = function(environment, expression, input, success, failure) {
    return environment.start(success, input * expression.multiply);
  };

  TestEnvironment.less = function(environment, expression, input, success, failure) {
    if (input < expression.less) {
      return environment.start(success, input);
    }
    else {
      return environment.start(failure, input);
    }
  };

  TestEnvironment.start = function(task, input, success, failure) {
    return setTimeout(function() {
      return task(TestEnvironment, input, success, failure);
    }, 0);
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
