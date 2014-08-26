var should = require("should");
var jex = require("..");
var environment = require("./TestEnvironment.js");

describe("# { if: { }, then: { }, else: { } }", function() {
  it("should evaluate 'then' when condition is met", function(done) {
    var test = jex({
      if: { true: null },
      then: { add: 5 }
    });

    test(environment, 1, function(environment, output) {
      should(output).equal(6);
      done();
    });
  });

  it("should not evaluate 'then' when condition is not met", function(done) {
    var test = jex({
      if: { false: null },
      then: { add: 5 }
    });

    test(environment, 1, function(environment, output) {
      should(output).equal(1);
      done();
    });
  });

  it("should fail if 'then' fails", function(done) {
    var test = jex({
      if: { true: null },
      then: { false: null }
    });

    test(environment, 1, null, function(environment, output) {
      should(output).equal(1);
      done();
    });
  });

  it("should evaluate 'else' when condition is not met", function(done) {
    var test = jex({
      if: { false: null },
      then: { add: 5 },
      else: { add: 10 }
    });

    test(environment, 1, function(environment, output) {
      should(output).equal(11);
      done();
    });
  });

  it("should not evaluate 'else' when condition is met", function(done) {
    var test = jex({
      if: { true: null },
      else: { add: 10 }
    });

    test(environment, 1, function(environment, output) {
      should(output).equal(1);
      done();
    });
  });

  it("should fail if 'else' fails", function(done) {
    var test = jex({
      if: { false: null },
      else: { false: null }
    });

    test(environment, 1, null, function(environment, output) {
      should(output).equal(1);
      done();
    });
  });
});
