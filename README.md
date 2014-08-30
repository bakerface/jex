# [J](#)SON [EX](#)pressions

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

## [Common Expressions](#common-expressions)
<a name="jex-true" href="#jex-true">#</a> { **true**: null } - return without error<br>
<a name="jex-false" href="#jex-false">#</a> { **false**: null } - return with a generic error<br>
<a name="jex-error" href="#jex-error">#</a> { **error**: { } } - return with a specific error<br>
<a name="jex-if" href="#jex-if">#</a> { **if**: { }, *then*: { }, *else*: { } } - conditional expression evaluation, one time<br>
<a name="jex-while" href="#jex-while">#</a> { **while**: { }, **do**: [ ] } - conditional expression evaluation, zero or more times<br>
<a name="jex-do" href="#jex-do">#</a> { **do**: [ ], *while*: { } } - conditional expression evaluation, one or more times<br>
<a name="jex-delay" href="#jex-delay">#</a> { **delay**: 0 } - idle for the specified time, in milliseconds<br>
<a name="jex-timeout" href="#jex-timeout">#</a> { **timeout**: { }, **milliseconds**: 0 } - time-limited expression evaluation<br>
