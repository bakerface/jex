var should = require("should");
var jex = require("..");

describe("# { true: null }", function() {
  var test = jex({ true: null });
  var environment = { };

  it("should succeed", function(done) {
    test(environment, "test", function(environment, output) {
      should(output).equal("test");
      done();
    });
  });
});
