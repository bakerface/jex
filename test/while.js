var should = require("should");
var jex = require("..");
var Calculator = require("./Calculator.js");

describe("jex.while(while, do)", function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator(1);
  });

  it("should repeat 'do' while condition is met", function(done) {
    var task = calculator.jex({
      while: { less: 100 },
      do: [
        { add: 1 },
        { multiply: 2 }
      ]
    });

    task(function(error) {
      should(error).not.be.ok;
      calculator.answer.should.equal(190);
      done();
    });
  });

  it("should not evaluate 'do' if condition is never met", function(done) {
    var task = calculator.jex({
      while: { false: null },
      do: [
        { add: 1 },
        { multiply: 2 }
      ]
    });

    task(function(error) {
      should(error).not.be.ok;
      calculator.answer.should.equal(1);
      done();
    });
  });
});
