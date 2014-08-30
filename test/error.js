var should = require("should");
var jex = require("..");
var Calculator = require("./Calculator.js");

describe("jex.error(error)", function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator(1);
  });

  it("should return with the specified error", function(done) {
    var task = calculator.jex({ error: "error" });

    task(function(error) {
      should(error).equal("error");
      done();
    });
  });
});
