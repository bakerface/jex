"use strict";

(function() {
  var root = this;
  var previous = root.previous;

  function bubble(task, success, failure) {
    return function(environment, input) {
      return task(environment, input, success, failure);
    };
  }

  function forward(task, input) {
    return function(environment, output, success, failure) {
      return task(environment, input, success, failure);
    };
  }

  function sequence(first, second) {
    return function(environment, input, success, failure) {
      return first(environment, input, bubble(second, success, failure), failure);
    };
  }

  function chain(tasks) {
    return tasks.reduce(sequence);
  }

  function if_then_else(if_task, then_task, else_task) {
    return function(environment, input, success, failure) {
      return if_task(environment, input,
          bubble(then_task, success, failure),
          bubble(else_task, success, failure));
    };
  }

  function while_do(while_task, do_task) {
    return function(environment, input, success, failure) {
      return while_task(environment, input,
          bubble(sequence(do_task, while_do(while_task, do_task)), success, failure),
          success);
    };
  }

  function do_while(do_task, while_task) {
    return sequence(do_task, while_do(while_task, do_task));
  }

  function counter(task) {
    var count = 0;

    return function(environment, input, success, failure) {
      return task(environment, count++,
        forward(success, input),
        forward(failure, input));
    };
  }

  function falsy(environment, input, success, failure) {
    return failure(environment, input);
  }

  function truthy(environment, input, success, failure) {
    return success(environment, input);
  }

  function jex_operation(expression) {
    for (var operation in expression) {
      return operation;
    }
  }

  function jex(expression) {
    var operation = jex_operation(expression);

    if (operation in jex) {
      return jex[operation](expression);
    }
    else {
      return function(environment, input, success, failure) {
        if (operation in environment) {
          return environment[operation](environment, expression, input, success, failure);
        }
        else {
          throw new Error("Undefined Operation: " + operation);
        }
      };
    }
  }

  jex.true = function(expression) {
    return truthy;
  };

  jex.false = function(expression) {
    return falsy;
  };

  jex.if = function(expression) {
    return if_then_else(jex(expression.if),
      expression.then ? jex(expression.then) : truthy,
      expression.else ? jex(expression.else) : truthy);
  };

  jex.while = function(expression) {
    return while_do(jex(expression.while),
      chain(expression.do.map(jex)));
  };

  jex.do = function(expression) {
    return do_while(chain(expression.do.map(jex)),
      expression.while ? jex(expression.while) : falsy);
  };

  jex.counter = function(expression) {
    return counter(jex(expression.counter));
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
