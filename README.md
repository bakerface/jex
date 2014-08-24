# [J](#json)SON [EX](#expressions)pressions

```json
{
  "do": [
    { "create": "simple expressions",
        "how": [ "quickly", "easily" ] }
    { "combine": "simple expressions",
        "to": { "create": "complex expressions" } },
    { "use": "complex expressions",
        "to": { "define": "business logic",
                  "how": "in a platform independent way" } },
  ]
}
```

## [Documentation](#documentation)
<a name="jex" href="#jex">#</a> **jex**(*expression*) - converts an expression to a function

```js
var jex = require("jex");

var login = jex({
  try: {
    do: [
      { prompt: "username" },
      { prompt: "password", hideInput: true },
      { authenticate: null },
      { display: "welcome" } ] },
  catch: {
    do: [
      { display: "invalid username or password" },
      { retry: true } ] },
  maxTries: 3
});

Views.HTML.prompt = function(environment, expression, input, callback) {
  ...
};

Views.HTML.display = function(environment, expression, input, callback) {
  ...
};

Views.HTML.authenticate = function(environment, expression, input, callback) {
  ...
};

login(Views.HTML, request, function(error, user) {
  if (error) { /* login failed */ }
  else { /* login was successful */ }
});

```

<a name="jex-true" href="#jex-true">#</a> jex.**true** - return with success<br>
<a name="jex-false" href="#jex-false">#</a> jex.**false** - return with a generic failure<br>
<a name="jex-error" href="#jex-error">#</a> jex.**error**(*error*) - return with a specific failure<br>
<a name="jex-if" href="#jex-if">#</a> jex.**if**(*if_condition, then_operation, else_operation*) - conditional expression evaluation<br>
<a name="jex-while" href="#jex-while">#</a> jex.**while**(*while_condition, do_operations*) - repeat evaluation of an ordered list of operations<br>
<a name="jex-do" href="#jex-do">#</a> jex.**do**(*do_operations, while_condition*) - repeat evaluation of an ordered list of expressions one or more times<br>
<a name="jex-try" href="#jex-try">#</a> jex.**try**(*try_operation, catch_operation, max_tries*) - repeat evaluation of an ordered list of expressions one or more times<br>
