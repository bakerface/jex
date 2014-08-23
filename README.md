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

<a name="jex" href="#jex">#</a> **jex**(*environment, expression, input, callback*) - evaluate *expression* on *input* in *environment*

<a name="jex-true" href="#jex-true">#</a> jex.**true**(*environment, expression, input, callback*) - callback with success

<a name="jex-false" href="#jex-false">#</a> jex.**false**(*environment, expression, input, callback*) - callback with a generic failure

<a name="jex-error" href="#jex-error">#</a> jex.**error**(*environment, expression, input, callback*) - callback with a specific failure

* *expression.error* - the error passed to the callback

<a name="jex-if" href="#jex-if">#</a> jex.**if**(*environment, expression, input, callback*) - conditional expression evaluation

* *expression.if* - the condition expression
* *expression.then* - the expression to evaluate when the condition is met
* *expression.else* - the expression to evaluate when the condition is not met (default: jex.[**true**](#jex-true))

<a name="jex-do" href="#jex-do">#</a> jex.**do**(*environment, expression, input, callback*) - evaluate an ordered list of expressions

* *expression.do* - the ordered list of expressions to evaluate
* *expression.while* - the repeat condition (default: jex.[**false**](#jex-false))
