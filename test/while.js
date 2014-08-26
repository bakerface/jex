var should = require("should");
var jex = require("..");
var environment = require("./TestEnvironment.js");

describe("# { while: { }, do: [ ] }", function() {
  it("should not evaluate if failure", function(done) {
    var test = jex({
      while: { false: null },
      do: [ { add: 5 } ]
    });

    test(environment, 1, function(environment, output) {
      should(output).equal(1);
      done();
    });
  });

  it("should evaluate tasks while successful", function(done) {
    var test = jex({
      while: { less: 1000 },
      do: [
        { add: 5 },
        { multiply: 2 } ]
    });

    test(environment, 1, function(environment, output) {
      should(output).equal(1398);
      done();
    });
  });

  it("should fail if 'do' fails", function(done) {
    var test = jex({
      while: { less: 1000 },
      do: [
        { add: 5 },
        { false: null },
        { multiply: 2 } ]
    });

    test(environment, 1, null, function(environment, output) {
      should(output).equal(6);
      done();
    });
  });
});
