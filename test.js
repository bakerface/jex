var should = require("should");
var jex = require("./jex.js");

function add(n) {
  return function(environment, input, callback) {
    return callback(null, input + n);
  };
}

function multiply(n) {
  return function(environment, input, callback) {
    return callback(null, input * n);
  };
}

function divide(n) {
  return function(environment, input, callback) {
    return callback(null, input / n);
  };
}

function less(n) {
  return function(environment, input, callback) {
    (input < n ? jex.true : jex.false)(environment, input, callback);
  };
}

var test_environment = {
  add: function(environment, expression, input, callback) {
    return add(expression.add)(environment, input, callback);
  },
  multiply: function(environment, expression, input, callback) {
    return multiply(expression.multiply)(environment, input, callback);
  },
  divide: function(environment, expression, input, callback) {
    return divide(expression.divide)(environment, input, callback);
  },
  less: function(environment, expression, input, callback) {
    return less(expression.less)(environment, input, callback);
  }
};

describe("# jex(expression)", function() {
  it("should use the first key of expression as the operation", function(done) {
    function test(environment, expression, input, callback) {
      done();
    }

    var expression = { test: null };
    var environment = { test: test };

    jex(expression)(environment, null, function(error, output) {

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

    jex(expression)(environment, input, function(error, output) {
      should(error).eql({ error: "error" });
      should(output).eql({ output: true});
      done();
    });
  });
});

describe("# jex.error(error)", function() {
  it("should fail with the specified error", function(done) {
    jex.error("error")(null, "input", function(error, output) {
      should(error).equal("error");
      should(output).equal("input");
      done();
    });
  });

  it("should be exposed as a primitive function", function(done) {
    var expression = { error: "error" };

    jex(expression)(test_environment, 1, function(error, output) {
      should(error).eql("error");
      should(output).equal(1);
      done();
    });
  });
});

describe("# jex.true", function() {
  it("should succeed", function(done) {
    jex.true(null, "input", function(error, output) {
      should(error).not.be.ok;
      should(output).equal("input");
      done();
    });
  });

  it("should be exposed as a primitive function", function(done) {
    var expression = { true: null };

    jex(expression)(test_environment, "input", function(error, output) {
      should(error).not.be.ok;
      should(output).equal("input");
      done();
    });
  });
});

describe("# jex.false", function() {
  it("should fail with a generic error", function(done) {
    jex.false(null, "input", function(error, output) {
      should(error).be.ok;
      should(output).equal("input");
      done();
    });
  });

  it("should be exposed as a primitive function", function(done) {
    var expression = { false: null };

    jex(expression)(test_environment, "input", function(error, output) {
      should(error).be.ok;
      should(output).equal("input");
      done();
    });
  });
});

describe("# jex.if(condition, success, failure)", function() {
  it("should evaluate success when condition succeeds", function(done) {
    jex.if(jex.true, add(5))(null, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(6);
      done();
    });
  });

  it("should not evaluate success when condition fails", function(done) {
    jex.if(jex.false, add(5))(null, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(1);
      done();
    });
  });

  it("should evaluate failure when condition fails", function(done) {
    jex.if(jex.false, add(5), add(2))(null, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(3);
      done();
    });
  });

  it("should be exposed as a primitive function", function(done) {
    var expression = {
      if: { false: null },
        then: { add: 5 },
        else: { add: 2 } };

    jex(expression)(test_environment, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(3);
      done();
    });
  });
});

describe("# jex.do(operations, condition)", function() {
  var operations = [ add(5), multiply(10), divide(2) ];

  it("should succeed when empty", function(done) {
    jex.do([ ])(null, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(1);
      done();
    });
  });

  it("should chain when functions succeed", function(done) {
    jex.do(operations)(null, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(30);
      done();
    });
  });

  it("should abort when a function fails", function(done) {
    jex.do([ add(5), jex.false, divide(2) ])(null, 1, function(error, output) {
      should(error).be.ok;
      should(output).equal(6);
      done();
    });
  });

  it("should repeat until condition fails", function(done) {
    jex.do(operations, less(1000))(null, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(4525);
      done();
    });
  });

  it("should be exposed as a primitive function", function(done) {
    var expression = {
      do: [ { add: 5 },
            { multiply: 10 },
            { divide: 2 } ],
        while: { less: 1000 } };

    jex(expression)(test_environment, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(4525);
      done();
    });
  });
});

describe("# jex.while(condition, operations)", function() {
  var operations = [ add(5), multiply(10), divide(2) ];

  it("should not evaluate if condition fails", function(done) {
    jex.while(jex.false, operations)(null, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(1);
      done();
    });
  });

  it("should abort when a function fails", function(done) {
    jex.while(jex.true, [ add(5), jex.false, divide(2) ])(null, 1, function(error, output) {
      should(error).be.ok;
      should(output).equal(6);
      done();
    });
  });

  it("should repeat until condition fails", function(done) {
    jex.while(less(1000), operations)(null, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(4525);
      done();
    });
  });

  it("should be exposed as a primitive function", function(done) {
    var expression = {
      while: { less: 1000 },
        do: [
          { add: 5 },
          { multiply: 10 },
          { divide: 2 } ] };

    jex(expression)(test_environment, 1, function(error, output) {
      should(error).not.be.ok;
      should(output).equal(4525);
      done();
    });
  });
});
