var should = require("should");
var jex = require("..");
var environment = require("./TestEnvironment.js");

describe("# { counter: { } }", function() {
  it("should evaluate the expression passing count as input", function(done) {
    var test = jex({
      while: { counter: { less: 3 } },
        do: [ { multiply: 2 } ] });

    test(environment, 1, function(environment, output) {
      should(output).equal(8);
      done();
    });
  });

  it("should be scope sensitive", function(done) {
    var test = jex({
      while: { counter: { less: 3 } },
      do: [ {
        while: { counter: { less: 4 } },
        do: [
          { add: 1 } ] } ] });

    test(environment, 0, function(environment, output) {
      should(output).equal(12);
      done();
    });
  });
});
