## Modules

<dl>
<dt><a href="#Choice.module_js">Choice.js</a></dt>
<dd><p>a Choice chain</p>
</dd>
<dt><a href="#Core.module_js">Core.js</a></dt>
<dd><p>core of cli-chain</p>
</dd>
<dt><a href="#Program.module_js">Program.js</a></dt>
<dd><p>a wrapper for Vorpal</p>
</dd>
<dt><a href="#Question.module_js">Question.js</a></dt>
<dd><p>a Question chain</p>
</dd>
<dt><a href="#Stepper.module_js">Stepper.js</a></dt>
<dd><p>a Stepper chain</p>
</dd>
<dt><a href="#StepperPersistance.module_js">StepperPersistance.js</a></dt>
<dd><p>a Stepper persisting chain</p>
</dd>
<dt><a href="#Steps.module_js">Steps.js</a></dt>
<dd><p>a Step chain</p>
</dd>
<dt><a href="#module_cli-chain">cli-chain</a></dt>
<dd><p>entry point</p>
</dd>
</dl>

## Classes

<dl>
<dt><a href="#Presets">Presets</a> : <code>ChainedMap</code></dt>
<dd></dd>
</dl>

## Functions

<dl>
<dt><a href="#choice">choice(name, [type], [msg])</a> ⇒ <code>StepChild</code></dt>
<dd><p>add a step, which is a new Question</p>
</dd>
<dt><a href="#init">init()</a> ⇒ <code>StepsFrom</code></dt>
<dd></dd>
</dl>

<a name="Choice.module_js"></a>

## Choice.js
a Choice chain

**Requires**: <code>module:flipchain/ChainedMap</code>, <code>module:fliplog</code>  

* [Choice.js](#Choice.module_js)
    * [~Choice](#Choice.module_js..Choice) : <code>ChainedMap</code>
        * [new Choice()](#new_Choice.module_js..Choice_new)
        * [.when(fn)](#Choice.module_js..Choice+when) ⇒ <code>Choice</code>
        * [.value(value)](#Choice.module_js..Choice+value) ⇒ <code>Choice</code>
        * [.name(name)](#Choice.module_js..Choice+name) ⇒ <code>Choice</code>
        * [.toConfig()](#Choice.module_js..Choice+toConfig) ⇒ <code>Object</code>

<a name="Choice.module_js..Choice"></a>

### Choice.js~Choice : <code>ChainedMap</code>
**Kind**: inner class of [<code>Choice.js</code>](#Choice.module_js)  

* [~Choice](#Choice.module_js..Choice) : <code>ChainedMap</code>
    * [new Choice()](#new_Choice.module_js..Choice_new)
    * [.when(fn)](#Choice.module_js..Choice+when) ⇒ <code>Choice</code>
    * [.value(value)](#Choice.module_js..Choice+value) ⇒ <code>Choice</code>
    * [.name(name)](#Choice.module_js..Choice+name) ⇒ <code>Choice</code>
    * [.toConfig()](#Choice.module_js..Choice+toConfig) ⇒ <code>Object</code>

<a name="new_Choice.module_js..Choice_new"></a>

#### new Choice()
a choice used in Question

<a name="Choice.module_js..Choice+when"></a>

#### choice.when(fn) ⇒ <code>Choice</code>
enable a step when a callback returns true

**Kind**: instance method of [<code>Choice</code>](#Choice.module_js..Choice)  
**Returns**: <code>Choice</code> - @chainable  

| Param | Type | Description |
| --- | --- | --- |
| fn | <code>function</code> | function that is bound to answers |

<a name="Choice.module_js..Choice+value"></a>

#### choice.value(value) ⇒ <code>Choice</code>
**Kind**: instance method of [<code>Choice</code>](#Choice.module_js..Choice)  
**Returns**: <code>Choice</code> - @chainable  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>\*</code> | value of a choice |

<a name="Choice.module_js..Choice+name"></a>

#### choice.name(name) ⇒ <code>Choice</code>
**Kind**: instance method of [<code>Choice</code>](#Choice.module_js..Choice)  
**Returns**: <code>Choice</code> - @chainable  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> | decorates the name and the value to use . syntax |

<a name="Choice.module_js..Choice+toConfig"></a>

#### choice.toConfig() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Choice</code>](#Choice.module_js..Choice)  
<a name="Core.module_js"></a>

## Core.js
core of cli-chain

**Requires**: <code>module:flipchain/ChainedMap</code>, <code>module:flipchain/ChainedSet</code>, <code>module:fliplog</code>, <code>module:./Steps</code>, <code>module:./Program</code>, <code>module:./Question</code>, <code>module:./Choice</code>  

* [Core.js](#Core.module_js)
    * [~Core](#Core.module_js..Core) : <code>ChainedMap</code>
        * [new Core([parent])](#new_Core.module_js..Core_new)
        * _instance_
            * [.handleParent([parent])](#Core.module_js..Core+handleParent)
            * [.decorateCurrent()](#Core.module_js..Core+decorateCurrent) ⇒ <code>Core</code>
            * [.program(...args)](#Core.module_js..Core+program) ⇒ <code>Program</code>
            * [.onAnswers([cb])](#Core.module_js..Core+onAnswers) ⇒ <code>Core</code>
            * [.then(cb)](#Core.module_js..Core+then) ⇒ <code>Core</code>
            * [.run()](#Core.module_js..Core+run) ⇒ <code>Promise</code>
            * [.child(name, type, [msg])](#Core.module_js..Core+child) ⇒ <code>StepChild</code>
            * [.stepChild(name, [type], [msg])](#Core.module_js..Core+stepChild) ⇒ <code>StepChild</code>
        * _static_
            * [.program()](#Core.module_js..Core.program) ⇒ <code>Core</code>
            * [.init([parent])](#Core.module_js..Core.init) ⇒ <code>Core</code>

<a name="Core.module_js..Core"></a>

### Core.js~Core : <code>ChainedMap</code>
**Kind**: inner class of [<code>Core.js</code>](#Core.module_js)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| answerCallbacks | <code>ChainedSet.&lt;string, function()&gt;</code> | callbacks to call for each answer |
| stepper | <code>Stepper</code> | steps through the steps 1 by 1 |
| answers | <code>answers</code> | from stepper.data, by reference |
| steps | <code>Steps</code> | steps to use in stepper |
| current | <code>Question</code> | last step accessed, for easier chaining |


* [~Core](#Core.module_js..Core) : <code>ChainedMap</code>
    * [new Core([parent])](#new_Core.module_js..Core_new)
    * _instance_
        * [.handleParent([parent])](#Core.module_js..Core+handleParent)
        * [.decorateCurrent()](#Core.module_js..Core+decorateCurrent) ⇒ <code>Core</code>
        * [.program(...args)](#Core.module_js..Core+program) ⇒ <code>Program</code>
        * [.onAnswers([cb])](#Core.module_js..Core+onAnswers) ⇒ <code>Core</code>
        * [.then(cb)](#Core.module_js..Core+then) ⇒ <code>Core</code>
        * [.run()](#Core.module_js..Core+run) ⇒ <code>Promise</code>
        * [.child(name, type, [msg])](#Core.module_js..Core+child) ⇒ <code>StepChild</code>
        * [.stepChild(name, [type], [msg])](#Core.module_js..Core+stepChild) ⇒ <code>StepChild</code>
    * _static_
        * [.program()](#Core.module_js..Core.program) ⇒ <code>Core</code>
        * [.init([parent])](#Core.module_js..Core.init) ⇒ <code>Core</code>

<a name="new_Core.module_js..Core_new"></a>

#### new Core([parent])

| Param | Type |
| --- | --- |
| [parent] | <code>Core</code> \| <code>StepChild</code> \| <code>any</code> | 

**Example**  
```js
story (name, is usable for multiple stories to run)
 step (name, type = checkboxes)
   group
     input (type = checkbox, input, confirm)
     input
   group
     input
     step (this is where it gets tricky eh)
       group
         input

 step
   group...
```
<a name="Core.module_js..Core+handleParent"></a>

#### core.handleParent([parent])
binds parent methods to child for easy chaining back up

**Kind**: instance method of [<code>Core</code>](#Core.module_js..Core)  
**Access**: protected  

| Param | Type |
| --- | --- |
| [parent] | <code>any</code> | 

<a name="Core.module_js..Core+decorateCurrent"></a>

#### core.decorateCurrent() ⇒ <code>Core</code>
decorates the latest step for easy chaining

**Kind**: instance method of [<code>Core</code>](#Core.module_js..Core)  
**Returns**: <code>Core</code> - @chainable  
**Access**: protected  
<a name="Core.module_js..Core+program"></a>

#### core.program(...args) ⇒ <code>Program</code>
**Kind**: instance method of [<code>Core</code>](#Core.module_js..Core)  

| Param | Type | Description |
| --- | --- | --- |
| ...args | <code>VorpalArgs</code> | args to pass to Vorpal |

<a name="Core.module_js..Core+onAnswers"></a>

#### core.onAnswers([cb]) ⇒ <code>Core</code>
function to call each time a user inputs an answer

**Kind**: instance method of [<code>Core</code>](#Core.module_js..Core)  
**Returns**: <code>Core</code> - @chainable  

| Param | Type | Default |
| --- | --- | --- |
| [cb] | <code>function</code> | <code>Function.prototype</code> | 

<a name="Core.module_js..Core+then"></a>

#### core.then(cb) ⇒ <code>Core</code>
after all answers are done,
      since we chain the promises
      it is a delayed promise resolve

**Kind**: instance method of [<code>Core</code>](#Core.module_js..Core)  
**Returns**: <code>Core</code> - @chainable  

| Param | Type |
| --- | --- |
| cb | <code>function</code> | 

<a name="Core.module_js..Core+run"></a>

#### core.run() ⇒ <code>Promise</code>
calls toConfig,
      passes in .then to stepper when there is one,
      starts the stepper

**Kind**: instance method of [<code>Core</code>](#Core.module_js..Core)  
<a name="Core.module_js..Core+child"></a>

#### core.child(name, type, [msg]) ⇒ <code>StepChild</code>
similar to stepChild, but adds to THIS.steps, not PARENT.steps

**Kind**: instance method of [<code>Core</code>](#Core.module_js..Core)  
**Returns**: <code>StepChild</code> - @chainable  
**Todo:**: abstract this and stepChild  
**Todo:**: pass in condition (when) here optionally  
**See**: this.stepChild, StepChild  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | key for the step, ends up on answers |
| type | <code>string</code> |  | any valid vorpal `type` |
| [msg] | <code>string</code> | <code>null</code> | defaults to `name`, text that is shown |

<a name="Core.module_js..Core+stepChild"></a>

#### core.stepChild(name, [type], [msg]) ⇒ <code>StepChild</code>
add a child step that has an auto-setup .when condition to be used

**Kind**: instance method of [<code>Core</code>](#Core.module_js..Core)  
**Returns**: <code>StepChild</code> - @chainable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | key for the step, ends up on answers |
| [type] | <code>string</code> | <code>&quot;&#x27;list&#x27;&quot;</code> | any valid vorpal `type` |
| [msg] | <code>string</code> | <code>null</code> | defaults to `name`, text that is shown |

<a name="Core.module_js..Core.program"></a>

#### Core.program() ⇒ <code>Core</code>
**Kind**: static method of [<code>Core</code>](#Core.module_js..Core)  
**See**: Core.program  
<a name="Core.module_js..Core.init"></a>

#### Core.init([parent]) ⇒ <code>Core</code>
**Kind**: static method of [<code>Core</code>](#Core.module_js..Core)  

| Param | Type |
| --- | --- |
| [parent] | <code>Core</code> \| <code>StepChild</code> \| <code>any</code> | 

<a name="Program.module_js"></a>

## Program.js
a wrapper for Vorpal

**Requires**: <code>module:funwithflags</code>, <code>module:vorpal</code>, <code>module:inspector-gadget</code>, <code>module:flipchain/ChainedSet</code>, <code>module:flipchain/ChainedMap</code>, <code>module:./Script</code>  

* [Program.js](#Program.module_js)
    * [~Program](#Program.module_js..Program) : <code>ChainedMap</code>
        * [new Program(parent)](#new_Program.module_js..Program_new)
        * [.program([version])](#Program.module_js..Program+program) ⇒ <code>Vorpal</code>
        * [.use(middleware)](#Program.module_js..Program+use) ⇒ <code>Program</code>
        * [.actionPrompt(name, [type], [msg], [cb])](#Program.module_js..Program+actionPrompt) ⇒ <code>Vorpal</code>

<a name="Program.module_js..Program"></a>

### Program.js~Program : <code>ChainedMap</code>
**Kind**: inner class of [<code>Program.js</code>](#Program.module_js)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| inspect | <code>function</code> | inspector-gadget .inspect helper |
| actions | <code>ChainedSet</code> |  |
| middleware | <code>Object</code> |  |


* [~Program](#Program.module_js..Program) : <code>ChainedMap</code>
    * [new Program(parent)](#new_Program.module_js..Program_new)
    * [.program([version])](#Program.module_js..Program+program) ⇒ <code>Vorpal</code>
    * [.use(middleware)](#Program.module_js..Program+use) ⇒ <code>Program</code>
    * [.actionPrompt(name, [type], [msg], [cb])](#Program.module_js..Program+actionPrompt) ⇒ <code>Vorpal</code>

<a name="new_Program.module_js..Program_new"></a>

#### new Program(parent)
wrapper around vorpal


| Param | Type |
| --- | --- |
| parent | <code>Program</code> \| <code>any</code> | 

<a name="Program.module_js..Program+program"></a>

#### program.program([version]) ⇒ <code>Vorpal</code>
**Kind**: instance method of [<code>Program</code>](#Program.module_js..Program)  
**Returns**: <code>Vorpal</code> - new  
**Todo:**: get the pkg json version  

| Param | Type | Default |
| --- | --- | --- |
| [version] | <code>string</code> | <code>null</code> | 

<a name="Program.module_js..Program+use"></a>

#### program.use(middleware) ⇒ <code>Program</code>
use a middleware

**Kind**: instance method of [<code>Program</code>](#Program.module_js..Program)  
**Returns**: <code>Program</code> - @chainable  

| Param | Type |
| --- | --- |
| middleware | <code>Object</code> | 

<a name="Program.module_js..Program+actionPrompt"></a>

#### program.actionPrompt(name, [type], [msg], [cb]) ⇒ <code>Vorpal</code>
**Kind**: instance method of [<code>Program</code>](#Program.module_js..Program)  

| Param | Type | Default |
| --- | --- | --- |
| name | <code>string</code> |  | 
| [type] | <code>string</code> | <code>&quot;&#x27;checkbox&#x27;&quot;</code> | 
| [msg] | <code>string</code> | <code>null</code> | 
| [cb] | <code>function</code> | <code></code> | 

<a name="Question.module_js"></a>

## Question.js
a Question chain

**Requires**: <code>module:flipchain</code>, <code>module:fliplog</code>, <code>module:./Choice</code>  

* [Question.js](#Question.module_js)
    * [~Question](#Question.module_js..Question) : <code>ChainedMap</code>
        * [new Question(parent)](#new_Question.module_js..Question_new)
        * [.checkbox(name, [checked], [msg])](#Question.module_js..Question+checkbox) ⇒ <code>Question</code>
        * [.confirm(name, [msg])](#Question.module_js..Question+confirm) ⇒ <code>Question</code>
        * [.input(name, [msg])](#Question.module_js..Question+input) ⇒ <code>Question</code>
        * [.list(name, [msg])](#Question.module_js..Question+list) ⇒ <code>Question</code>
        * [.choice(name, [msg])](#Question.module_js..Question+choice) ⇒ <code>Question</code>
        * [.separator([msg])](#Question.module_js..Question+separator) ⇒ <code>Question</code>
        * [.shorthand(list, arg, fn)](#Question.module_js..Question+shorthand) ⇒ <code>Question</code>
        * [.shorthandFactory(methods)](#Question.module_js..Question+shorthandFactory) ⇒ <code>Question</code>
        * [.toConfig()](#Question.module_js..Question+toConfig) ⇒ <code>Object</code>
        * [.when(fn)](#Question.module_js..Question+when) ⇒ <code>Question</code>
        * [.whenIncl(props, [needles])](#Question.module_js..Question+whenIncl) ⇒ <code>Question</code>

<a name="Question.module_js..Question"></a>

### Question.js~Question : <code>ChainedMap</code>
**Kind**: inner class of [<code>Question.js</code>](#Question.module_js)  
**Properties**

| Name | Type |
| --- | --- |
| _choices | <code>ChainedSet</code> | 
| current | <code>Choice</code> | 


* [~Question](#Question.module_js..Question) : <code>ChainedMap</code>
    * [new Question(parent)](#new_Question.module_js..Question_new)
    * [.checkbox(name, [checked], [msg])](#Question.module_js..Question+checkbox) ⇒ <code>Question</code>
    * [.confirm(name, [msg])](#Question.module_js..Question+confirm) ⇒ <code>Question</code>
    * [.input(name, [msg])](#Question.module_js..Question+input) ⇒ <code>Question</code>
    * [.list(name, [msg])](#Question.module_js..Question+list) ⇒ <code>Question</code>
    * [.choice(name, [msg])](#Question.module_js..Question+choice) ⇒ <code>Question</code>
    * [.separator([msg])](#Question.module_js..Question+separator) ⇒ <code>Question</code>
    * [.shorthand(list, arg, fn)](#Question.module_js..Question+shorthand) ⇒ <code>Question</code>
    * [.shorthandFactory(methods)](#Question.module_js..Question+shorthandFactory) ⇒ <code>Question</code>
    * [.toConfig()](#Question.module_js..Question+toConfig) ⇒ <code>Object</code>
    * [.when(fn)](#Question.module_js..Question+when) ⇒ <code>Question</code>
    * [.whenIncl(props, [needles])](#Question.module_js..Question+whenIncl) ⇒ <code>Question</code>

<a name="new_Question.module_js..Question_new"></a>

#### new Question(parent)

| Param | Type |
| --- | --- |
| parent | <code>ChainedMap</code> \| <code>any</code> | 

<a name="Question.module_js..Question+checkbox"></a>

#### question.checkbox(name, [checked], [msg]) ⇒ <code>Question</code>
**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**Returns**: <code>Question</code> - @chainable  
**See**: Question.factory  
**Since**: 0.0.6  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  |  |
| [checked] | <code>boolean</code> | <code>false</code> |  |
| [msg] | <code>string</code> |  | defaults to name |

<a name="Question.module_js..Question+confirm"></a>

#### question.confirm(name, [msg]) ⇒ <code>Question</code>
**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**Returns**: <code>Question</code> - @chainable  
**See**: Question.factory  
**Since**: 0.0.6  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| [msg] | <code>string</code> | defaults to name |

<a name="Question.module_js..Question+input"></a>

#### question.input(name, [msg]) ⇒ <code>Question</code>
**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**Returns**: <code>Question</code> - @chainable  
**See**: Question.factory  
**Since**: 0.0.6  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| [msg] | <code>string</code> | defaults to name |

<a name="Question.module_js..Question+list"></a>

#### question.list(name, [msg]) ⇒ <code>Question</code>
**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**Returns**: <code>Question</code> - @chainable  
**See**: Question.factory  
**Since**: 0.0.6  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| [msg] | <code>string</code> | defaults to name |

<a name="Question.module_js..Question+choice"></a>

#### question.choice(name, [msg]) ⇒ <code>Question</code>
**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**Returns**: <code>Question</code> - @chainable  
**See**: Question.factory  
**Since**: 0.0.6  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>string</code> |  |
| [msg] | <code>string</code> | defaults to name |

<a name="Question.module_js..Question+separator"></a>

#### question.separator([msg]) ⇒ <code>Question</code>
**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**Returns**: <code>Question</code> - @chainable  
**Since**: 0.0.8  

| Param | Type | Default |
| --- | --- | --- |
| [msg] | <code>string</code> | <code>&quot;&#x27;===&#x27;&quot;</code> | 

<a name="Question.module_js..Question+shorthand"></a>

#### question.shorthand(list, arg, fn) ⇒ <code>Question</code>
adds shorthand methods using the factory

**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**Returns**: <code>Question</code> - @chainable  
**Access**: protected  
**See**: Question.constructor  

| Param | Type |
| --- | --- |
| list | <code>Array.&lt;string&gt;</code> | 
| arg | <code>any</code> | 
| fn | <code>function</code> | 

<a name="Question.module_js..Question+shorthandFactory"></a>

#### question.shorthandFactory(methods) ⇒ <code>Question</code>
take single methods, add as multi methods

**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**Returns**: <code>Question</code> - @chainable  
**Since**: 0.0.8  

| Param | Type | Description |
| --- | --- | --- |
| methods | <code>Array.&lt;string&gt;</code> | methods to add `s` to and decorate Question |

**Example**  
```js
separator -> separators
```
<a name="Question.module_js..Question+toConfig"></a>

#### question.toConfig() ⇒ <code>Object</code>
**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**See**: Question._choices  
**Since**: 0.0.8  
<a name="Question.module_js..Question+when"></a>

#### question.when(fn) ⇒ <code>Question</code>
**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**Returns**: <code>Question</code> - @chainable  
**Todo:**: chainedSet instead  
**Since**: 0.0.8  

| Param | Type |
| --- | --- |
| fn | <code>function</code> | 

<a name="Question.module_js..Question+whenIncl"></a>

#### question.whenIncl(props, [needles]) ⇒ <code>Question</code>
when using two args, checks first arg as prop(s), second as does-include
 when using a single arg, it checks against last answer

**Kind**: instance method of [<code>Question</code>](#Question.module_js..Question)  
**Returns**: <code>Question</code> - @chainable  
**Since**: 0.0.9  

| Param | Type | Default |
| --- | --- | --- |
| props | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | 
| [needles] | <code>string</code> \| <code>Array.&lt;string&gt;</code> | <code>null</code> | 

<a name="Stepper.module_js"></a>

## Stepper.js
a Stepper chain

**Requires**: <code>module:inquirer</code>, <code>module:fliplog</code>, <code>module:./StepperPersistance</code>  

* [Stepper.js](#Stepper.module_js)
    * [~Stepper](#Stepper.module_js..Stepper) : <code>ChainedMap</code>
        * [new Stepper(parent)](#new_Stepper.module_js..Stepper_new)
        * [.start(steps)](#Stepper.module_js..Stepper+start) ⇒ <code>Promise</code>
        * [._start()](#Stepper.module_js..Stepper+_start) ⇒ <code>Stepper</code>
        * [.setupStdIn()](#Stepper.module_js..Stepper+setupStdIn) ⇒ <code>Stepper</code>
        * [.thenner()](#Stepper.module_js..Stepper+thenner) ⇒ <code>Promise</code> \| <code>null</code>

<a name="Stepper.module_js..Stepper"></a>

### Stepper.js~Stepper : <code>ChainedMap</code>
**Kind**: inner class of [<code>Stepper.js</code>](#Stepper.module_js)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| parent | <code>\*</code> |  |
| data | <code>Object</code> | answers from prompting |
| answerCallbacks | <code>\*</code> \| <code>function</code> |  |
| goingBack | <code>boolean</code> | for stepping back in interactive |
| indx | <code>number</code> | current step index |
| prompter | <code>Object</code> | inquirer instance |
| ui | <code>Object</code> | inquirer.ui |
| steps | <code>Array.&lt;Step&gt;</code> | in Stepper.start |
| resolve | <code>function</code> | in Stepper.start, for using .then |
| stdin | <code>Object</code> | for subscribing to stdin events (for going back) |
| persistance | <code>StepperPersistance</code> | persisting & hydrating |


* [~Stepper](#Stepper.module_js..Stepper) : <code>ChainedMap</code>
    * [new Stepper(parent)](#new_Stepper.module_js..Stepper_new)
    * [.start(steps)](#Stepper.module_js..Stepper+start) ⇒ <code>Promise</code>
    * [._start()](#Stepper.module_js..Stepper+_start) ⇒ <code>Stepper</code>
    * [.setupStdIn()](#Stepper.module_js..Stepper+setupStdIn) ⇒ <code>Stepper</code>
    * [.thenner()](#Stepper.module_js..Stepper+thenner) ⇒ <code>Promise</code> \| <code>null</code>

<a name="new_Stepper.module_js..Stepper_new"></a>

#### new Stepper(parent)

| Param | Type |
| --- | --- |
| parent | <code>Chainable</code> \| <code>any</code> | 

<a name="Stepper.module_js..Stepper+start"></a>

#### stepper.start(steps) ⇒ <code>Promise</code>
sets this.resolve in a returned promise
 which can be used by Stepper.then
 when iterating through steps in Stepper.thenner

**Kind**: instance method of [<code>Stepper</code>](#Stepper.module_js..Stepper)  
**Since**: 0.0.8  

| Param | Type |
| --- | --- |
| steps | <code>Array.&lt;Step&gt;</code> | 

<a name="Stepper.module_js..Stepper+_start"></a>

#### stepper._start() ⇒ <code>Stepper</code>
does actual setup

**Kind**: instance method of [<code>Stepper</code>](#Stepper.module_js..Stepper)  
**Returns**: <code>Stepper</code> - @chainable  
**Access**: protected  
**See**: this.start, persistance.hydrate  
**Since**: 0.0.11  
<a name="Stepper.module_js..Stepper+setupStdIn"></a>

#### stepper.setupStdIn() ⇒ <code>Stepper</code>
sets up process.stdin observer that will step back if needed

**Kind**: instance method of [<code>Stepper</code>](#Stepper.module_js..Stepper)  
**Returns**: <code>Stepper</code> - @chainable  
**See**: Stepper.index, Stepper.thenner, Stepper.start  
**Since**: 0.0.9  
**Todo**

- [ ] going back 2 doubles things, need to clear and fix?

<a name="Stepper.module_js..Stepper+thenner"></a>

#### stepper.thenner() ⇒ <code>Promise</code> \| <code>null</code>
**Kind**: instance method of [<code>Stepper</code>](#Stepper.module_js..Stepper)  
**See**: Stepper.steps  
**Since**: 0.0.6  
<a name="StepperPersistance.module_js"></a>

## StepperPersistance.js
a Stepper persisting chain

**Requires**: <code>module:configstore</code>, <code>module:fliplog</code>, <code>module:inquirer</code>, <code>module:prettydate</code>, <code>module:flipchain/ChainedMap</code>  

* [StepperPersistance.js](#StepperPersistance.module_js)
    * [~StepperPersistance](#StepperPersistance.module_js..StepperPersistance) : <code>ChainedMap</code>
        * [new StepperPersistance()](#new_StepperPersistance.module_js..StepperPersistance_new)
        * [.reset([steps])](#StepperPersistance.module_js..StepperPersistance+reset) ⇒ <code>StepperPersistance</code>
        * [.isHydratable(steps)](#StepperPersistance.module_js..StepperPersistance+isHydratable) ⇒ <code>boolean</code>
        * [.persist()](#StepperPersistance.module_js..StepperPersistance+persist) ⇒ <code>StepperPersistance</code>
        * [.removeStdIn()](#StepperPersistance.module_js..StepperPersistance+removeStdIn) ⇒ <code>StepperPersistance</code>
        * [.onStdIn(buffer)](#StepperPersistance.module_js..StepperPersistance+onStdIn) ⇒ <code>Buffer</code>
        * [.echoCurrent()](#StepperPersistance.module_js..StepperPersistance+echoCurrent) ⇒ <code>StepperPersistance</code>
        * [.getData()](#StepperPersistance.module_js..StepperPersistance+getData) ⇒ <code>Object</code>
        * [.handleDelete()](#StepperPersistance.module_js..StepperPersistance+handleDelete) ⇒ <code>StepperPersistance</code>
        * [.handleCancelDelete()](#StepperPersistance.module_js..StepperPersistance+handleCancelDelete) ⇒ <code>StepperPersistance</code>
        * [.promptDelete()](#StepperPersistance.module_js..StepperPersistance+promptDelete) ⇒ <code>StepperPersistance</code>
        * [.rehydrate(indx, data)](#StepperPersistance.module_js..StepperPersistance+rehydrate) ⇒ <code>StepperPersistance</code>
        * [.thenner()](#StepperPersistance.module_js..StepperPersistance+thenner) ⇒ <code>Class</code>

<a name="StepperPersistance.module_js..StepperPersistance"></a>

### StepperPersistance.js~StepperPersistance : <code>ChainedMap</code>
**Kind**: inner class of [<code>StepperPersistance.js</code>](#StepperPersistance.module_js)  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| showing | <code>boolean</code> | showing the list |
| deleting | <code>boolean</code> | prompting deleting of an item |
| hydrated | <code>boolean</code> | already rehydrated, when prompting to rehydrate |
| confirming | <code>boolean</code> | asking to resume, don't listen to keypresses |
| indx | <code>number</code> | current _session_ index, varies from Stepper.indx |
| hash | <code>string</code> | key to match sessions that are able to be used for a hash |
| stdin | <code>Object</code> | for subscribing to stdin events (for going back) |
| onStdIn | <code>function</code> | subscriber for stdin |
| sessions | <code>Object</code> | configstore sessions... |
| store | <code>ConfigStore</code> | configstore for persisting |
| prompter | <code>Object</code> | inquirer instance |
| ui | <code>Object</code> | inquirer.ui |


* [~StepperPersistance](#StepperPersistance.module_js..StepperPersistance) : <code>ChainedMap</code>
    * [new StepperPersistance()](#new_StepperPersistance.module_js..StepperPersistance_new)
    * [.reset([steps])](#StepperPersistance.module_js..StepperPersistance+reset) ⇒ <code>StepperPersistance</code>
    * [.isHydratable(steps)](#StepperPersistance.module_js..StepperPersistance+isHydratable) ⇒ <code>boolean</code>
    * [.persist()](#StepperPersistance.module_js..StepperPersistance+persist) ⇒ <code>StepperPersistance</code>
    * [.removeStdIn()](#StepperPersistance.module_js..StepperPersistance+removeStdIn) ⇒ <code>StepperPersistance</code>
    * [.onStdIn(buffer)](#StepperPersistance.module_js..StepperPersistance+onStdIn) ⇒ <code>Buffer</code>
    * [.echoCurrent()](#StepperPersistance.module_js..StepperPersistance+echoCurrent) ⇒ <code>StepperPersistance</code>
    * [.getData()](#StepperPersistance.module_js..StepperPersistance+getData) ⇒ <code>Object</code>
    * [.handleDelete()](#StepperPersistance.module_js..StepperPersistance+handleDelete) ⇒ <code>StepperPersistance</code>
    * [.handleCancelDelete()](#StepperPersistance.module_js..StepperPersistance+handleCancelDelete) ⇒ <code>StepperPersistance</code>
    * [.promptDelete()](#StepperPersistance.module_js..StepperPersistance+promptDelete) ⇒ <code>StepperPersistance</code>
    * [.rehydrate(indx, data)](#StepperPersistance.module_js..StepperPersistance+rehydrate) ⇒ <code>StepperPersistance</code>
    * [.thenner()](#StepperPersistance.module_js..StepperPersistance+thenner) ⇒ <code>Class</code>

<a name="new_StepperPersistance.module_js..StepperPersistance_new"></a>

#### new StepperPersistance()
check if there are any saved states
 prompt with a list of saved states
 allow deleting of those saved states

<a name="StepperPersistance.module_js..StepperPersistance+reset"></a>

#### stepperPersistance.reset([steps]) ⇒ <code>StepperPersistance</code>
setup and reset

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>StepperPersistance</code> - @chainable  
**Since**: 0.0.11  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [steps] | <code>Array.&lt;Step&gt;</code> | <code></code> | steps to use as key |

<a name="StepperPersistance.module_js..StepperPersistance+isHydratable"></a>

#### stepperPersistance.isHydratable(steps) ⇒ <code>boolean</code>
checks if there are existing stored sessions

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>boolean</code> - hydratable or not  
**See**: configstore, Stepper, StepperPersistance.reset  
**Since**: 0.0.11  

| Param | Type | Description |
| --- | --- | --- |
| steps | <code>Object</code> | stringified steps to serve as a hash |

<a name="StepperPersistance.module_js..StepperPersistance+persist"></a>

#### stepperPersistance.persist() ⇒ <code>StepperPersistance</code>
save the current index and state

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>StepperPersistance</code> - @chainable  
**See**: configstore  
**Since**: 0.0.11  
<a name="StepperPersistance.module_js..StepperPersistance+removeStdIn"></a>

#### stepperPersistance.removeStdIn() ⇒ <code>StepperPersistance</code>
unsubscribes

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>StepperPersistance</code> - @chainable  
**Access**: protected  
**Since**: 0.0.11  
<a name="StepperPersistance.module_js..StepperPersistance+onStdIn"></a>

#### stepperPersistance.onStdIn(buffer) ⇒ <code>Buffer</code>
**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>Buffer</code> - stdin buffer  

| Param | Type | Description |
| --- | --- | --- |
| buffer | <code>Buffer</code> | stdin buffer |

<a name="StepperPersistance.module_js..StepperPersistance+echoCurrent"></a>

#### stepperPersistance.echoCurrent() ⇒ <code>StepperPersistance</code>
echos current session when using [->] or deleting

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>StepperPersistance</code> - @chainable  
**Access**: protected  
**See**: this.promptDelete  
**Since**: 0.0.11  
<a name="StepperPersistance.module_js..StepperPersistance+getData"></a>

#### stepperPersistance.getData() ⇒ <code>Object</code>
transforms data with prettydate,
      colors a message,
      maps sessions to prompts

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>Object</code> - latest session, message  
**Since**: 0.0.11  
<a name="StepperPersistance.module_js..StepperPersistance+handleDelete"></a>

#### stepperPersistance.handleDelete() ⇒ <code>StepperPersistance</code>
deletes current index, updates configstore

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>StepperPersistance</code> - @chainable  
**Access**: protected  
**See**: this.promptDelete, this.handleCancelDelete  
**Since**: 0.0.11  
<a name="StepperPersistance.module_js..StepperPersistance+handleCancelDelete"></a>

#### stepperPersistance.handleCancelDelete() ⇒ <code>StepperPersistance</code>
removes listener / resets, starts again

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>StepperPersistance</code> - @chainable  
**See**: this.rehydrate  
**Since**: 0.0.11  
<a name="StepperPersistance.module_js..StepperPersistance+promptDelete"></a>

#### stepperPersistance.promptDelete() ⇒ <code>StepperPersistance</code>
closes ui, prompts to delete

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>StepperPersistance</code> - @chainable  
**Todo:**: use Core here  
**See**: this.echoCurrent, this.handleDelete, this.handleCancelDelete  
**Since**: 0.0.11  
<a name="StepperPersistance.module_js..StepperPersistance+rehydrate"></a>

#### stepperPersistance.rehydrate(indx, data) ⇒ <code>StepperPersistance</code>
rehydrate from a saved state

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>StepperPersistance</code> - @chainable  
**Access**: protected  
**See**: this.thenner, Stepper._start  
**Since**: 0.0.11  
**Todo**

- [ ] use a .toConfig of steps


| Param | Type |
| --- | --- |
| indx | <code>number</code> | 
| data | <code>Array.&lt;\*&gt;</code> | 

<a name="StepperPersistance.module_js..StepperPersistance+thenner"></a>

#### stepperPersistance.thenner() ⇒ <code>Class</code>
prompts to rehydrate

**Kind**: instance method of [<code>StepperPersistance</code>](#StepperPersistance.module_js..StepperPersistance)  
**Returns**: <code>Class</code> - @chainable  
**See**: this.getData  
**Since**: 0.0.11  
<a name="Steps.module_js"></a>

## Steps.js
a Step chain

**Requires**: <code>module:flipchain/ChainedSet</code>, <code>module:flipchain/ChainedMap</code>  
<a name="Steps.module_js..Steps"></a>

### Steps.js~Steps : <code>ChainedSet</code>
**Kind**: inner class of [<code>Steps.js</code>](#Steps.module_js)  
**Todo:**: instead of an array needs to return obj?  
**Properties**

| Name | Type |
| --- | --- |
| data | <code>ChainedSet</code> | 

<a name="module_cli-chain"></a>

## cli-chain
entry point

**Requires**: <code>module:likeaboss</code>, <code>module:vorpal</code>, <code>module:lodash.sortBy</code>, <code>module:inspector-gadget</code>, <code>module:to-arr</code>, <code>module:inquirer</code>, <code>module:./Core</code>  
<a name="Presets"></a>

## Presets : <code>ChainedMap</code>
**Kind**: global class  
**Todo:**: - [ ] should be configurable
      if they want presets to be saved to pkgjson
      or to a file that is not gitignored

add
  makes a config file for presets
load
  loads an existing presets from the config file
  executes it in a subprocess
  it should (be able to) reset argv, then re-run program  
**Note**: WIP  

* [Presets](#Presets) : <code>ChainedMap</code>
    * [.getKeyFlag(val, prop)](#Presets+getKeyFlag) ⇒ <code>Object</code>
    * [.add(preset, [order])](#Presets+add)

<a name="Presets+getKeyFlag"></a>

### presets.getKeyFlag(val, prop) ⇒ <code>Object</code>
**Kind**: instance method of [<code>Presets</code>](#Presets)  

| Param | Type |
| --- | --- |
| val | <code>string</code> \| <code>Array.&lt;string&gt;</code> | 
| prop | <code>string</code> | 

<a name="Presets+add"></a>

### presets.add(preset, [order])
**Kind**: instance method of [<code>Presets</code>](#Presets)  
**Todo:**: - [ ] need to add some decorator/transformer that changes it when saving...  

| Param | Type | Default |
| --- | --- | --- |
| preset | <code>Object</code> |  | 
| [order] | <code>Array.&lt;string&gt;</code> | <code>[]</code> | 

<a name="choice"></a>

## choice(name, [type], [msg]) ⇒ <code>StepChild</code>
add a step, which is a new Question

**Kind**: global function  
**Returns**: <code>StepChild</code> - @chainable  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> |  | key for the step, ends up on answers |
| [type] | <code>string</code> | <code>&quot;&#x27;checkbox&#x27;&quot;</code> |  |
| [msg] | <code>string</code> | <code>null</code> | defaults to `name`, text that is shown |

<a name="init"></a>

## init() ⇒ <code>StepsFrom</code>
**Kind**: global function  
**Returns**: <code>StepsFrom</code> - @chainable  
