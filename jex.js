"use strict";

(function() {
  var root = this;
  var previous = root.previous;

  var jex_operation = function(expression) {
    for (var key in expression) {
      return key;
    }
  };

  var jex = function(environment, expression) {
    return function(input, callback) {
      var operation = jex_operation(expression);
      return environment[operation](expression, input, callback);
    };
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
