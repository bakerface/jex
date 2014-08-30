var should = require("should");
var jex = require("..");
var Calculator = require("./Calculator.js");

describe("jex.false()", function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator(1);
  });

  it("should return with error", function(done) {
    var task = calculator.jex({ false: null });

    task(function(error) {
      should(error).eql({ kind: "jex-false" });
      done();
    });
  });
});
