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

  jex.true = function(environment, expression, input, callback) {
    return callback(null, input);
  };

  jex.false = function(environment, expression, input, callback) {
    return callback({ }, input);
  };

  jex.error = function(environment, expression, input, callback) {
    return callback(expression.error, input);
  };

  jex.if = function(environment, expression, input, callback) {
    jex(environment, expression.if, input, function(error, output) {
      if (error) {
        if (expression.else) {
          return jex(environment, expression.else, output, callback);
        }
        else {
          return jex.true(environment, { true: null }, output, callback);
        }
      }
      else {
        return jex(environment, expression.then, output, callback);
      }
    });
  };

  jex.do = function(environment, expression, input, callback) {
    var tasks = expression.do.slice(0);

    function next(error, output) {
      if (error) {
        return jex.error(environment, { error: error }, output, callback);
      }
      else if (tasks.length > 0) {
        return jex(environment, tasks.shift(), output, next);
      }
      else if (expression.while) {
        return jex.if(environment, {
          if: expression.while,
            then: expression
        }, output, callback);
      }
      else {
        return jex.true(environment, { true: null }, output, callback);
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
