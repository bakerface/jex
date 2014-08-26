var should = require("should");
var jex = require("..");
var environment = require("./TestEnvironment.js");

describe("# { false: null }", function() {
  var test = jex({ false: null });

  it("should fail", function(done) {
    test(environment, "test", null, function(environment, output) {
      should(output).equal("test");
      done();
    });
  });
});
