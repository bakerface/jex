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

  var jex = function(expression) {
    var operation = jex_operation(expression);

    if (operation) {
      return function(environment, input, callback) {
        var method = environment[operation] || primitive_operation(operation);

        if (method) {
          return method(environment, expression, input, callback);
        }
        else {
          throw new Error("Undefined Operation: " + operation);
        }
      };
    }
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

  jex.if = function(if_condition, then_operation, else_operation) {
    else_operation = else_operation || jex.true;

    return function(environment, input, callback) {
      return if_condition(environment, input, function(error, output) {
        return (error ? else_operation : then_operation)
          (environment, output, callback);
      });
    };
  };

  default_environment.if = function(expression) {
    return jex.if(
      jex(expression.if),
      jex(expression.then),
      jex(expression.else));
  };

  jex.do = function(do_operations, while_condition) {
    while_condition = while_condition || jex.false;

    function run_operations(environment, input, callback) {
      var tasks = do_operations.slice(0);

      function next(error, output) {
        if (error) {
          return jex.error(error)(environment, output, callback);
        }
        else if (tasks.length > 0) {
          return tasks.shift()(environment, output, next);
        }
        else {
          return jex.if(while_condition, run_operations, jex.true)
            (environment, output, callback);
        }
      }

      return next(null, input);
    }

    return run_operations;
  };

  default_environment.do = function(expression) {
    return jex.do(
      expression.do.map(jex),
      jex(expression.while));
  };

  jex.while = function(while_condition, do_operations) {
    return jex.if(while_condition, jex.do(do_operations, while_condition));
  };

  default_environment.while = function(expression) {
    return jex.while(
      jex(expression.while),
      expression.do.map(jex));
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
