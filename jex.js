"use strict";

(function() {
  var root = this;
  var previous = root.previous;

  var jex_operation = function(expression) {
    for (var key in expression) {
      return key;
    }
  };

  var jex = function(environment, expression, input, callback) {
    var operation = jex_operation(expression);
    return environment[operation](environment, expression, input, callback);
  };

  jex.do = function(environment, expression, input, callback) {
    var tasks = expression.do.slice(0);

    function next(error, output) {
      if (error) {
        return callback(error, output);
      }
      else if (tasks.length > 0) {
        return jex(environment, tasks.shift(), output, next);
      }
      else if (expression.while) {
        jex(environment, expression.while, output, function(error) {
          if (error) {
            return callback(null, output);
          }
          else {
            tasks = expression.do.slice(0);
            return next(null, output);
          }
        });
      }
      else {
        return callback(error, output);
      }
    }

    return next(null, input);
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
