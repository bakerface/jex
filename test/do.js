var should = require("should");
var jex = require("..");
var environment = require("./TestEnvironment.js");

describe("# { do: [ ], while: { } }", function() {
  it("should evaluate the tasks in the order specified", function(done) {
    var test = jex({
      do: [
        { add: 5 },
        { multiply: 2 } ]
    });

    test(environment, 1, function(environment, output) {
      should(output).equal(12);
      done();
    });
  });

  it("should evaluate the tasks at least once", function(done) {
    var test = jex({
      do: [
        { add: 5 },
        { multiply: 2 } ],
      while: { false: null }
    });

    test(environment, 1, function(environment, output) {
      should(output).equal(12);
      done();
    });
  });

  it("should evaluate tasks while successful", function(done) {
    var test = jex({
      do: [
        { add: 5 },
        { multiply: 2 } ],
      while: { less: 1000 }
    });

    test(environment, 1, function(environment, output) {
      should(output).equal(1398);
      done();
    });
  });

  it("should fail if 'do' fails", function(done) {
    var test = jex({
      do: [
        { add: 5 },
        { false: 2 } ],
      while: { less: 1000 }
    });

    test(environment, 1, null, function(environment, output) {
      should(output).equal(6);
      done();
    });
  });
});
