"use strict";

(function() {
  var root = this;
  var previous = root.jex;
  var primitives = { };

  var jex = root.jex = function(expression) {
    for (var operation in expression) {
      var task = this[operation] || primitives[operation];

      if (task) {
        return jex.delay(task.bind(this)(expression), 0);
      }
      else {
        return jex.undefinedOperation(operation);
      }
    }
  };

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

  jex.operationTimeout = function() {
    return jex.error({
      kind: "jex-operation-timeout"
    });
  };

  primitives.error = function(expression) {
    return jex.error(expression.error);
  };

  jex.true = function() {
    return function(callback) {
      return callback();
    };
  };

  primitives.true = function(expression) {
    return jex.true();
  };

  jex.false = function() {
    return jex.error({ kind: "jex-false" });
  };

  primitives.false = function(expression) {
    return jex.false();
  };

  jex.delay = function(task, milliseconds) {
    return function(callback) {
      setTimeout(function() {
        task(callback);
      }, milliseconds);
    };
  };

  primitives.delay = function(expression) {
    return jex.delay(this.jex(expression.delay), expression.milliseconds);
  };

  jex.if = function(_if, _then, _else) {
    return function(callback) {
      _if(function(error) {
        if (error) return _else(callback);
        else return _then(callback);
      });
    };
  };

  primitives.if = function(expression) {
    return jex.if(this.jex(expression.if),
      expression.then ? this.jex(expression.then) : jex.true(),
      expression.else ? this.jex(expression.else) : jex.true());
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

  primitives.while = function(expression) {
    return jex.while(this.jex(expression.while),
      jex.chain(expression.do.map(this.jex)));
  };

  jex.do = function(_do, _while) {
    return jex.sequence(_do, jex.while(_while, _do));
  };

  primitives.do = function(expression) {
    return jex.do(jex.chain(expression.do.map(this.jex)),
      expression.while ? this.jex(expression.while) : jex.false());
  };

  jex.timeout = function(task, milliseconds) {
    return function(callback) {
      var timer;

      function end() {
        if (timer) {
          clearTimeout(timer);
          timer = null;
          return true;
        }

        return false;
      }

      function expired() {
        if (end()) {
          jex.operationTimeout()(callback);
        }
      }

      function completed(error) {
        if (end()) {
          jex.error(error)(callback);
        }
      }

      timer = setTimeout(expired, milliseconds);
      return task(completed);
    };
  };

  primitives.timeout = function(expression) {
    return jex.timeout(this.jex(expression.timeout), expression.milliseconds);
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
