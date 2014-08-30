var should = require("should");
var jex = require("..");
var Calculator = require("./Calculator.js");

describe("jex(expression)", function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator(1);
  });

  it("should use the first property of the expression as the operation", function(done) {
    var task = calculator.jex({ add: 2, foo: "bar" });

    task(function(error) {
      should(error).not.be.ok;
      calculator.answer.should.equal(3);
      done();
    });
  });

  it("should return an error if the operation is undefined", function(done) {
    var task = calculator.jex({ prime: null });

    task(function(error) {
      should(error).eql({
        kind: "jex-undefined-operation",
        operation: "prime"
      });

      calculator.answer.should.equal(1);
      done();
    });
  });
});
