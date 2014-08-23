var should = require("should");
var jex = require("./jex.js");

describe("#jex(environment, expression)", function() {
  it("should use the first key of expression as the operation", function(done) {
    function test(expression, input, callback) {
      done();
    }

    var expression = { test: null };
    var environment = { test: test };
    var job = jex(environment, expression);
    job(null, function(error, output) { });
  });

  it("should pass expression to the operation", function(done) {
    function test(expression, input, callback) {
      expression.should.eql({
        test: "test",
        foo: "bar"
      });

      done();
    }

    var expression = {
      test: "test",
      foo: "bar"
    };

    var environment = { test: test };
    var job = jex(environment, expression);
    job(null, function(error, output) { });
  });
});
