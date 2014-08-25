var should = require("should");
var jex = require("..");

describe("# { false: null }", function() {
  var test = jex({ false: null });
  var environment = { };

  it("should fail", function(done) {
    test(environment, "test", null, function(environment, output) {
      should(output).equal("test");
      done();
    });
  });
});
