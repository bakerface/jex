var should = require("should");
var jex = require("..");
var Calculator = require("./Calculator.js");

describe("jex.parallel(tasks)", function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator(1);
  });

  it("should return with the error of the first failure", function(done) {
    var task = calculator.jex({
      parallel: [
        { do: [ { delay: 20 }, { error: 1 } ] },
        { do: [ { delay: 10 }, { error: 2 } ] },
        { do: [ { delay: 30 }, { error: 3 } ] }
      ]
    });

    task(function(error) {
      should(error).equal(2);
      done();
    });
  });

  it("should return without error if all were successful", function(done) {
    var task = calculator.jex({
      parallel: [
        { do: [ { delay: 20 }, { add: 1 } ] },
        { do: [ { delay: 10 }, { multiply: 10 } ] },
        { do: [ { delay: 30 }, { add: 5 } ] }
      ]
    });

    task(function(error) {
      should(error).not.be.ok;
      calculator.answer.should.equal(16);
      done();
    });
  });
});
