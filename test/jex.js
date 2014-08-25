var should = require("should");
var jex = require("..");

describe("# jex(expression)", function() {
  var foo = jex({ foo: "bar", bar: "foo" });

  var environment = {
    foo: function(environment, expression, input, success, failure) {
      success(environment, input + expression.foo);
    }
  };

  it("should use the first key as an operation", function(done) {
    foo(environment, "foo", function(environment, output) {
      should(output).equal("foobar");
      done();
    });
  });
});
