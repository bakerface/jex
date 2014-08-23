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

[#](#jex) **jex**(*environment, expression, input, callback*) - evaluate *expression* on *input* in *environment*

[#](#jex-true) jex.**true**(*environment, expression, input, callback*) - callback with success


[#](#jex-false) jex.**false**(*environment, expression, input, callback*) - callback with failure


[#](#jex-if) jex.**if**(*environment, expression, input, callback*) - conditional expression evaluation

* *expression.if* - the condition expression
* *expression.then* - the expression to evaluate when the condition is met
* *expression.else* - the expression to evaluate when the condition is not met (default: jex.[**true**](#jex-true))

[#](#jex-do) jex.**do**(*environment, expression, input, callback*) - evaluate an ordered list of expressions

* *expression.do* - the ordered list of expressions to evaluate
* *expression.while* - the repeat condition (default: jex.[**false**](#jex-false))
