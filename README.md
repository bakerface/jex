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

## [Primitive Expressions](#documentation)
<a name="jex-true" href="#jex-true">#</a> { **true**: null } - return with success<br>
<a name="jex-false" href="#jex-false">#</a> { **false**: null } - return with a generic failure<br>
<a name="jex-if" href="#jex-if">#</a> { **if**: { }, *then*: { }, *else*: { } } - conditional expression evaluation<br>
<a name="jex-while" href="#jex-while">#</a> { **while**: { }, **do**: [ ] } - repeat evaluation of an ordered list of expressions zero or more times<br>
<a name="jex-do" href="#jex-do">#</a> { **do**: [ ], *while*: { } } - repeat evaluation of an ordered list of expressions one or more times<br>
