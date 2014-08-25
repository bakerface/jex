"use strict";

(function() {
  var root = this;
  var previous = root.previous;

  var jex = function(expression) {
    return function(environment, input, success, failure) {
      for (var operation in expression) {
        var task = environment[operation] || jex[operation];

        if (task) {
          return task(environment, expression, input, success, failure);
        }
        else {
          throw new Error("Undefined Operation: " + operation);
        }
      }
    };
  };

  function truthy(environment, input, success, failure) {
    return success(environment, input);
  }

  function falsy(environment, input, success, failure) {
    return failure(environment, input);
  }

  function sequence(first, next) {
    return function(environment, input, success, failure) {
      return first(environment, input, sequence(next, success), failure);
    };
  }

  function chain(tasks) {
    return function(environment, input, success, failure) {
      return tasks.reduce(sequence)(environment, input, success, failure);
    };
  }

  function conditional(condition, when_success, when_failure) {
    return function(environment, input, success, failure) {
      return condition(environment, input,
        function(environment, input) {
          return when_success(environment, input, success, failure);
        },
        function(environment, input) {
          return when_failure(environment, input, success, failure);
        });
    }
  }

  function conditional_loop(condition, loop) {
    return function(environment, input, success, failure) {
      var operation = conditional(condition,
          sequence(loop, conditional_loop(condition, loop)),
          truthy);

      return operation(environment, input, success, failure);
    };
  }

  jex.true = function(environment, expression, input, success, failure) {
    return success(environment, input);
  };

  jex.false = function(environment, expression, input, success, failure) {
    return failure(environment, input);
  };

  jex.if = function(environment, expression, input, success, failure) {
    var operation = conditional(jex(expression.if),
      expression.then ? jex(expression.then) : truthy,
      expression.else ? jex(expression.else) : truthy);

    return operation(environment, input, success, failure);
  };

  jex.while = function(environment, expression, input, success, failure) {
    var operation = conditional_loop(
      jex(expression.while),
      chain(expression.do.map(jex)));

    return operation(environment, input, success, failure);
  };

  jex.conflict = function() {
    root.jex = previous;
    return jex;
  };

  if (typeof(exports) !== "undefined") {
    if (typeof(module) !== "undefined") {
      exports = module.exports = jex;
    }

    exports.jex = jex;
  }
  else {
    root.jex = jex;
  }

}).call(this);
