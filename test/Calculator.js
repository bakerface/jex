"use strict";

(function() {
  var root = this;
  var previous = root.Calculator;

  var Calculator = root.Calculator = function(answer) {
    this.answer = answer;
  };

  Calculator.prototype.add = function(expression) {
    function invoke(callback) {
      this.answer += expression.add;
      return callback();
    }

    return invoke.bind(this);
  };

  Calculator.prototype.multiply = function(expression) {
    function invoke(callback) {
      this.answer *= expression.multiply;
      return callback();
    }

    return invoke.bind(this);
  };

  Calculator.prototype.less = function(expression) {
    function invoke(callback) {
      if (this.answer < expression.less) return callback();
      else return callback(expression);
    }

    return invoke.bind(this);
  };

  Calculator.conflict = function() {
    root.Calculator = previous;
    return Calculator;
  };

  if (typeof(exports) !== "undefined") {
    if (typeof(module) !== "undefined") {
      exports = module.exports = Calculator;
    }

    exports.Calculator = Calculator;
  }
  else {
    root.Calculator = Calculator;
  }
}).call(this);
