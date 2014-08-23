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

[#](#) **jex**(*environment, expression, input, callback*) - evaluate *expression* on *input* in *environment*

[#](#) jex.**do**(*environment, expression, input, callback*) - evaluate an ordered list of expressions

* *expression.do* - the ordered list of expressions to evaluate
* *expression.while* - the optional loop condition
