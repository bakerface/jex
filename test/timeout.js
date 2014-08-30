var should = require("should");
var jex = require("..");
var Calculator = require("./Calculator.js");

describe("jex.timeout(task, milliseconds)", function() {
  var calculator;

  beforeEach(function() {
    calculator = new Calculator(1);
  });

  it("should succeed if task succeeds before the timeout", function(done) {
    var task = calculator.jex({
      timeout: {
        delay: { add: 2 },
        milliseconds: 10
      },
      milliseconds: 20
    });

    task(function(error) {
      should(error).not.be.ok;
      calculator.answer.should.equal(3);
      done();
    });
  });

  it("should fail if task fails before the timeout", function(done) {
    var task = calculator.jex({
      timeout: {
        delay: { error: "error" },
        milliseconds: 10
      },
      milliseconds: 20
    });

    task(function(error) {
      should(error).equal("error");
      calculator.answer.should.equal(1);
      done();
    });
  });

  it("should fail if task succeeds after the timeout", function(done) {
    var task = calculator.jex({
      timeout: {
        delay: { add: 2 },
        milliseconds: 1000
      },
      milliseconds: 20
    });

    task(function(error) {
      should(error).eql({ kind: "jex-operation-timeout" });
      calculator.answer.should.equal(1);
      done();
    });
  });

  it("should fail if task fails after the timeout", function(done) {
    var task = calculator.jex({
      timeout: {
        delay: { error: "error" },
        milliseconds: 1000
      },
      milliseconds: 20
    });

    task(function(error) {
      should(error).eql({ kind: "jex-operation-timeout" });
      calculator.answer.should.equal(1);
      done();
    });
  });
});
