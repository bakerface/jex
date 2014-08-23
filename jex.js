"use strict";

(function() {
  var root = this;
  var previous = root.previous;
  var default_environment = { };

  var jex_operation = function(expression) {
    for (var key in expression) {
      return key;
    }
  };

  var primitive_operation = function(operation) {
    if (operation in default_environment) {
      return function(environment, expression, input, callback) {
        return default_environment[operation](expression)
          (environment, input, callback);
      };
    }
  };

  var to_function = function(expression) {
    var operation = jex_operation(expression);

    return function(environment, input, callback) {
      var method = environment[operation] || primitive_operation(operation);

      if (method) {
        return method(environment, expression, input, callback);
      }
      else {
        throw new Error("Undefined Operation: " + operation);
      }
    };
  };

  var to_optional_function = function(expression) {
    if (expression) {
      return to_function(expression);
    }
  };

  var jex = function(environment, expression, input, callback) {
    return to_function(expression)(environment, input, callback);
  };

  jex.error = function(error) {
    return function(environment, input, callback) {
      return callback(error, input);
    };
  };

  default_environment.error = function(expression) {
    return jex.error(expression.error);
  };

  jex.true = jex.error(false);

  default_environment.true = function(expression) {
    return jex.true;
  };

  jex.false = jex.error(true);

  default_environment.false = function(expression) {
    return jex.false;
  };

  jex.if = function(condition, success, failure) {
    failure = failure || jex.true;

    return function(environment, input, callback) {
      return condition(environment, input, function(error, output) {
        return (error ? failure : success)(environment, output, callback);
      });
    };
  };

  default_environment.if = function(expression) {
    return jex.if(
      to_function(expression.if),
      to_function(expression.then),
      to_optional_function(expression.else));
  };

  jex.do = function(operations, condition) {
    condition = condition || jex.false;

    function do_operations(environment, input, callback) {
      var tasks = operations.slice(0);

      function next(error, output) {
        if (error) {
          return jex.error(error)(environment, output, callback);
        }
        else if (tasks.length > 0) {
          return tasks.shift()(environment, output, next);
        }
        else {
          return jex.if(condition, do_operations, jex.true)
            (environment, output, callback);
        }
      }

      return next(null, input);
    }

    return do_operations;
  };

  default_environment.do = function(expression) {
    return jex.do(
      expression.do.map(to_function),
      to_optional_function(expression.while));
  };

  jex.while = function(condition, operations) {
    return jex.if(condition, jex.do(operations, condition));
  };

  default_environment.while = function(expression) {
    return jex.while(
      to_function(expression.while),
      expression.do.map(to_function));
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
