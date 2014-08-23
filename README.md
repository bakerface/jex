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

<a name="jex-true" href="#jex-true">#</a> jex.**true** - return with success

<a name="jex-false" href="#jex-false">#</a> jex.**false** - return with a generic failure

<a name="jex-error" href="#jex-error">#</a> jex.**error**(*error*) - return with a specific failure

* *error* - the error passed to the callback

<a name="jex-if" href="#jex-if">#</a> jex.**if**(*condition, success, failure*) - conditional expression evaluation

* *condition* - the condition function
* *success* - the function to invoke if the condition was met
* *failure* - the function to invoke if the condition was not met (default: jex.[**true**](#jex-true))

<a name="jex-while" href="#jex-while">#</a> jex.**while**(*condition, operations*) - repeat evaluation of an ordered list of expressions

* *condition* - the condition function
* *operations* - the ordered list of functions to invoke while the condition is met

<a name="jex-do" href="#jex-do">#</a> jex.**do**(*operations, condition*) - repeat evaluation of an ordered list of expressions one or more times

* *operations* - the ordered list of functions to invoke while the condition is met
* *condition* - the condition function (default: jex.[**false**](#jex-false))
