var should = require("should");
var jex = require("..");

var environment = {
  add: function(environment, expression, input, success, failure) {
    success(environment, input + expression.add);
  },
  multiply: function(environment, expression, input, success, failure) {
    success(environment, input * expression.multiply);
  },
  less: function(environment, expression, input, success, failure) {
    (input < expression.less ? success : failure)
      (environment, input);
  },
};

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

  it("should evaluate operations while successful", function(done) {
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
});
