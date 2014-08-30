var should = require("should");
var jex = require("..");
var Calculator = require("./Calculator.js");

describe("jex.if(if, then, else)", function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator(1);
  });

  it("should evaluate 'then' if condition is met", function(done) {
    var task = calculator.jex({
      if: { true: null },
      then: { add: 5 },
      else: { add: 10 }
    });

    task(function(error) {
      should(error).not.be.ok;
      calculator.answer.should.equal(6);
      done();
    });
  });

  it("should evaluate 'else' if condition is not met", function(done) {
    var task = calculator.jex({
      if: { false: null },
      then: { add: 5 },
      else: { add: 10 }
    });

    task(function(error) {
      should(error).not.be.ok;
      calculator.answer.should.equal(11);
      done();
    });
  });
});
