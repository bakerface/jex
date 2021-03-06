var should = require("should");
var jex = require("..");
var Calculator = require("./Calculator.js");

describe("jex.true()", function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator(1);
  });

  it("should return without error", function(done) {
    var task = calculator.jex({ true: null });

    task(function(error) {
      should(error).not.be.ok;
      done();
    });
  });
});
