var should = require("should");
var jex = require("..");
var Calculator = require("./Calculator.js");

describe("jex.do(do, while)", function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator(1);
  });

  it("should repeat 'do' while condition is met", function(done) {
    var task = calculator.jex({
      do: [
        { add: 1 },
        { multiply: 2 }
      ],
      while: { less: 100 }
    });

    task(function(error) {
      should(error).not.be.ok;
      calculator.answer.should.equal(190);
      done();
    });
  });

  it("should evaluate 'do' once if condition is never met", function(done) {
    var task = calculator.jex({
      do: [
        { add: 1 },
        { multiply: 2 }
      ],
      while: { false: null }
    });

    task(function(error) {
      should(error).not.be.ok;
      calculator.answer.should.equal(4);
      done();
    });
  });

  it("should evaluate 'do' once if condition is undefined", function(done) {
    var task = calculator.jex({
      do: [
        { add: 1 },
        { multiply: 2 }
      ]
    });

    task(function(error) {
      should(error).not.be.ok;
      calculator.answer.should.equal(4);
      done();
    });
  });
});
