var should = require("should");
var jex = require("..");
var environment = require("./TestEnvironment.js");

describe("# { true: null }", function() {
  var test = jex({ true: null });

  it("should succeed", function(done) {
    test(environment, "test", function(environment, output) {
      should(output).equal("test");
      done();
    });
  });
});
