var should = require("should");
var jex = require("..");
var environment = require("./TestEnvironment.js");

describe("# jex(expression)", function() {
  var foo = jex({ add: 5, foo: "bar" });

  it("should use the first key as an operation", function(done) {
    foo(environment, 1, function(environment, output) {
      should(output).equal(6);
      done();
    });
  });
});
