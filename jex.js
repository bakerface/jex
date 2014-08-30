"use strict";

(function() {
  var root = this;
  var previous = root.jex;

  var jex = root.jex = function(expression) {
    for (var operation in expression) {
      var task = this[operation] || jex.primitives[operation];

      if (task) {
        return task.bind(this)(expression);
      }
      else {
        return jex.undefinedOperation(operation);
      }
    }
  };

  jex.primitives = { };

  jex.error = function(error) {
    return function(callback) {
      return callback(error);
    };
  };

  jex.undefinedOperation = function(operation) {
    return jex.error({
      kind: "jex-undefined-operation",
      operation: operation
    });
  };

  jex.primitives.error = function(expression) {
    return jex.error(expression.error);
  };

  jex.true = function() {
    return function(callback) {
      return callback();
    };
  };

  jex.primitives.true = function(expression) {
    return jex.true();
  };

  jex.false = function() {
    return jex.error({ kind: "jex-false" });
  };

  jex.primitives.false = function(expression) {
    return jex.false();
  };

  jex.if = function(_if, _then, _else) {
    return function(callback) {
      _if(function(error) {
        if (error) return _else(callback);
        else return _then(callback);
      });
    };
  };

  jex.primitives.if = function(expression) {
    return jex.if(this.jex(expression.if),
      this.jex(expression.then),
      this.jex(expression.else));
  };

  jex.sequence = function(first, second) {
    return function(callback) {
      first(function(error) {
        if (error) return callback(error);
        else return second(callback);
      });
    };
  };

  jex.chain = function(tasks) {
    return tasks.reduce(jex.sequence);
  };

  jex.while = function(_while, _do) {
    function step(callback) {
      var task = jex.if(_while, jex.sequence(_do, step), jex.true());
      task(callback);
    }

    return step;
  };

  jex.primitives.while = function(expression) {
    return jex.while(this.jex(expression.while),
      jex.chain(expression.do.map(this.jex)));
  };

  jex.do = function(_do, _while) {
    return jex.sequence(_do, jex.while(_while, _do));
  };

  jex.primitives.do = function(expression) {
    return jex.do(jex.chain(expression.do.map(this.jex)),
      expression.while ? this.jex(expression.while) : jex.false());
  };

  jex.conflict = function() {
    root.jex = previous;
    return jex;
  };

  Object.defineProperty(Object.prototype, "jex", {
    set: function() { },
    get: function() { return jex.bind(this); },
    configurable: true
  });

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
