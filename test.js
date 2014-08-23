var should = require("should");
var jex = require("./jex.js");

describe("#jex(environment, expression, input, callback)", function() {
  it("should use the first key of expression as the operation", function(done) {
    function test(environment, expression, input, callback) {
      done();
    }

    var expression = { test: null };
    var environment = { test: test };

    jex(environment, expression, null, function(error, output) {

    });
  });

  it("should forward the arguments", function(done) {
    function test(environment, expression, input, callback) {
      environment.should.eql({ test: test });
      expression.should.eql({ test: null });
      input.should.eql({ input: true });
      return callback({ error: "error" }, { output: true });
    }

    var expression = { test: null };
    var environment = { test: test };
    var input = { input: true };

    jex(environment, expression, input, function(error, output) {
      should(error).eql({ error: "error" });
      should(output).eql({ output: true});
      done();
    });
  });
});

describe("#jex.do(environment, expression, input, callback)", function() {
  it("should succeed when empty", function(done) {
    var expression = { do: [ ] };
    var environment = { };
    var input = { input: true };

    jex.do(environment, expression, input, function(error, output) {
      should(error).not.be.ok;
      should(output).eql({ input: true});
      done();
    });
  });

  it("should chain when functions succeed", function(done) {
    var expression = {
      do: [
        { add: 5 },
        { multiply: 10 },
        { divide: 2 }
      ]
    };

    var environment = {
      do: jex.do,
      add: function(environment, expression, input, callback) {
        return callback(null, input + expression.add);
      },
      multiply: function(environment, expression, input, callback) {
        return callback(null, input * expression.multiply);
      },
      divide: function(environment, expression, input, callback) {
        return callback(null, input / expression.divide);
      }
    };

    jex(environment, expression, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(30);
      done();
    });
  });

  it("should abort when a function fails", function(done) {
    var expression = {
      do: [
        { add: 5 },
        { multiply: 10 },
        { divide: 2 }
      ]
    };

    var environment = {
      do: jex.do,
      add: function(environment, expression, input, callback) {
        return callback(null, input + expression.add);
      },
      multiply: function(environment, expression, input, callback) {
        return callback("error", input);
      },
      divide: function(environment, expression, input, callback) {
        return callback(null, input / expression.divide);
      }
    };

    jex(environment, expression, 1, function(error, output) {
      should(error).equal("error");
      should(output).equal(6);
      done();
    });
  });

  it("should repeat until condition fails", function(done) {
    var expression = {
      do: [
        { add: 5 },
        { multiply: 10 },
        { divide: 2 }
      ],
      while: { lessThan: 1000 }
    };

    var environment = {
      do: jex.do,
      add: function(environment, expression, input, callback) {
        return callback(null, input + expression.add);
      },
      multiply: function(environment, expression, input, callback) {
        return callback(null, input * expression.multiply);
      },
      divide: function(environment, expression, input, callback) {
        return callback(null, input / expression.divide);
      },
      lessThan: function(environment, expression, input, callback) {
        return callback(!(input < expression.lessThan), input);
      }
    };

    jex(environment, expression, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(4525);
      done();
    });
  });
});
