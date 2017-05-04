# [cli-chain](https://github.com/fliphub/fliphub#readme) *0.0.11*

> chainable cli creation, minimal, interactive, powerful.


### src/Choice.js


#### new Choice() 








##### Returns


- `Void`



#### Choice.when(fn) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fn | `Function`  | function that is bound to answers | &nbsp; |




##### Returns


- `Choice`  @chainable



#### Choice.value(value) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| value |  | value of a choice | &nbsp; |




##### Returns


- `Choice`  @chainable



#### Choice.name(name) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | decorates the name and the value to use . syntax | &nbsp; |




##### Returns


- `Choice`  @chainable



#### Choice.toConfig() 








##### Returns


- `Object`  




### src/Core.js


#### new Core() 








##### Examples

```javascript
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


##### Returns


- `Void`



#### Core.program() 








##### Returns


- `Core`  



#### Core.init([parent]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parent | `Core` `StepChild` `any`  |  | *Optional* |




##### Returns


- `Core`  



#### Core.constructor([parent]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parent | `Core` `StepChild` `any`  |  | *Optional* |




##### Returns


- `Void`



#### Core.handleParent([parent]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parent | `any`  |  | *Optional* |




##### Returns


- `Void`



#### Core.decorateCurrent() 








##### Returns


- `Core`  @chainable



#### Core.program(args) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| args | `VorpalArgs`  | args to pass to Vorpal | &nbsp; |




##### Returns


- `Program`  



#### Core.onAnswers() 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| cb&#x3D;Function.prototype | `Function`  |  | *Optional* |




##### Returns


- `Core`  @chainable



#### Core.then(cb) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| cb | `Function`  |  | &nbsp; |




##### Returns


- `Core`  @chainable



#### Core.run() 








##### Returns


- `Promise`  



#### Core.step(name[, type&#x3D;&#x27;checkbox&#x27;, msg&#x3D;null]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | key for the step, ends up on answers | &nbsp; |
| type&#x3D;&#x27;checkbox&#x27; | `string`  |  | *Optional* |
| msg&#x3D;null | `string`  | defaults to `name`, text that is shown | *Optional* |




##### Returns


- `StepChild`  @chainable



#### Core.child(name, type[, msg&#x3D;null]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | key for the step, ends up on answers | &nbsp; |
| type | `string`  | any valid vorpal `type` | &nbsp; |
| msg&#x3D;null | `string`  | defaults to `name`, text that is shown | *Optional* |




##### Returns


- `StepChild`  @chainable



#### Core.stepChild(name[, type&#x3D;&#x27;list&#x27;, msg&#x3D;null]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | key for the step, ends up on answers | &nbsp; |
| type&#x3D;&#x27;list&#x27; | `string`  | any valid vorpal `type` | *Optional* |
| msg&#x3D;null | `string`  | defaults to `name`, text that is shown | *Optional* |




##### Returns


- `StepChild`  @chainable



#### Core.toConfig() 








##### Returns


- `Step`  




### src/index.js


#### Boss() 








##### Returns


- `Void`




### src/Presets.js


#### new Presets() 








##### Returns


- `Void`



#### Presets.getKeyFlag(val, prop) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| val | `string` `Array.&lt;string&gt;`  |  | &nbsp; |
| prop | `string`  |  | &nbsp; |




##### Returns


- `Object`  



#### Presets.add(preset[, order&#x3D;]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| preset | `Object`  |  | &nbsp; |
| order&#x3D; | `Array.&lt;string&gt;`  |  | *Optional* |




##### Returns


- `Void`




### src/Program.js


#### fwf() 








##### Returns


- `Void`



#### new Program() 








##### Returns


- `Void`



#### Program.constructor(parent) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parent | `Program` `any`  |  | &nbsp; |




##### Returns


- `Void`



#### Program.program([version]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| version | `string`  |  | *Optional* |




##### Returns


- `Vorpal`  new



#### Program.use(middleware) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| middleware | `Object`  |  | &nbsp; |




##### Returns


- `Program`  @chainable



#### Program.actionPrompt(name[, type&#x3D;&#x27;checkbox&#x27;, msg&#x3D;null, cb&#x3D;null]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  |  | &nbsp; |
| type&#x3D;&#x27;checkbox&#x27; | `string`  |  | *Optional* |
| msg&#x3D;null | `string`  |  | *Optional* |
| cb&#x3D;null | `Function`  |  | *Optional* |




##### Returns


- `Vorpal`  




### src/Question.js


#### new Question() 








##### Returns


- `Void`



#### Question.constructor(parent) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parent | `ChainedMap` `any`  |  | &nbsp; |




##### Returns


- `Void`



#### Question.factory(type, names, msg)  *private method*






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| type | `string`  |  | &nbsp; |
| names | `Array.&lt;string&gt;`  |  | &nbsp; |
| msg | `string`  |  | &nbsp; |




##### Returns


- `Choice`  



#### Question.checkbox(name[, checked&#x3D;false, msg]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  |  | &nbsp; |
| checked&#x3D;false | `boolean`  |  | *Optional* |
| msg | `string`  | defaults to name | *Optional* |




##### Returns


- `Question`  @chainable



#### Question.confirm(name[, msg]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  |  | &nbsp; |
| msg | `string`  | defaults to name | *Optional* |




##### Returns


- `Question`  @chainable



#### Question.input(name[, msg]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  |  | &nbsp; |
| msg | `string`  | defaults to name | *Optional* |




##### Returns


- `Question`  @chainable



#### Question.list(name[, msg]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  |  | &nbsp; |
| msg | `string`  | defaults to name | *Optional* |




##### Returns


- `Question`  @chainable



#### Question.choice(name[, msg]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  |  | &nbsp; |
| msg | `string`  | defaults to name | *Optional* |




##### Returns


- `Question`  @chainable



#### Question.separator([msg&#x3D;&#x27;&#x3D;&#x3D;&#x3D;&#x27;]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| msg&#x3D;&#x27;&#x3D;&#x3D;&#x3D;&#x27; | `string`  |  | *Optional* |




##### Returns


- `Question`  @chainable



#### Question.shorthand(list, arg, fn) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| list | `Array.&lt;string&gt;`  |  | &nbsp; |
| arg | `any`  |  | &nbsp; |
| fn | `Function`  |  | &nbsp; |




##### Returns


- `Question`  @chainable



#### Question.shorthandFactory(methods) 

take single methods, add as multi methods




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| methods | `Array.&lt;string&gt;`  | methods to add `s` to and decorate Question | &nbsp; |




##### Examples

```javascript
separator -> separators
```


##### Returns


- `Question`  @chainable



#### Question.toConfig() 








##### Returns


- `Object`  



#### Question.when(fn) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| fn | `Function`  |  | &nbsp; |




##### Returns


- `Question`  @chainable



#### Question.whenIncl(props[, needles&#x3D;null]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| props | `string` `Array.&lt;string&gt;`  |  | &nbsp; |
| needles&#x3D;null | `string` `Array.&lt;string&gt;`  |  | *Optional* |




##### Returns


- `Question`  @chainable



#### negated() 








##### Returns


- `Void`



#### if() 








##### Returns


- `Void`



#### if() 








##### Returns


- `Void`




### src/Stepper.js


#### new Stepper() 








##### Returns


- `Void`



#### Stepper.constructor(parent) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| parent | `Chainable` `any`  |  | &nbsp; |




##### Returns


- `Void`



#### Stepper.start(steps) 

sets this.resolve in a returned promise
 which can be used by Stepper.then
 when iterating through steps in Stepper.thenner




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| steps | `Array.&lt;Step&gt;`  |  | &nbsp; |




##### Returns


- `Promise`  



#### Stepper._start() 








##### Returns


- `Stepper`  @chainable



#### Stepper.setupStdIn() 








##### Returns


- `Stepper`  @chainable



#### Stepper.thenner() 








##### Returns


- `Promise`  




### src/StepperPersistance.js


#### ChainedMap() 








##### Returns


- `Void`



#### new StepperPersistance() 

check if there are any saved states
 prompt with a list of saved states
 allow deleting of those saved states






##### Returns


- `Void`



#### reset([steps]) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| steps | `Array.&lt;Step&gt;`  | = null] steps to use as key | *Optional* |




##### Returns


- `StepperPersistance`  @chainable



#### isHydratable(steps) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| steps | `Object`  | stringified steps to serve as a hash | &nbsp; |




##### Returns


- `boolean`  hydratable or not



#### persist() 








##### Returns


- `StepperPersistance`  @chainable



#### removeStdIn() 








##### Returns


- `StepperPersistance`  @chainable



#### setupStdIn() 








##### Returns


- `StepperPersistance`  @chainable



#### this.onStdIn(buffer) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| buffer | `Buffer`  | stdin buffer | &nbsp; |




##### Returns


- `Buffer`  stdin buffer



#### echoCurrent() 








##### Returns


- `StepperPersistance`  @chainable



#### getData() 








##### Returns


- `Object`  latest session, message



#### handleDelete() 








##### Returns


- `StepperPersistance`  @chainable



#### handleCancelDelete() 








##### Returns


- `StepperPersistance`  @chainable



#### promptDelete() 








##### Returns


- `StepperPersistance`  @chainable



#### rehydrate(indx, data) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| indx | `number`  |  | &nbsp; |
| data | `Array.&lt;*&gt;`  |  | &nbsp; |




##### Returns


- `StepperPersistance`  @chainable



#### thenner() 








##### Returns


- `Class`  @chainable




### src/Steps.js


#### new Steps() 








##### Returns


- `Void`




### src/StepsFrom.js


#### module.exports() 








##### Returns


- `Void`



#### init() 








##### Returns


- `StepsFrom`  @chainable



#### handle(program) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| program | `Program`  |  | &nbsp; |




##### Returns


- `StepsFrom`  @chainable



#### uniq(names) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| names | `string` `Array.&lt;string&gt;`  | names of steps to unique | &nbsp; |




##### Returns


- `StepsFrom`  @chainable



#### then(cb) 






##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| cb | `Function`  |  | &nbsp; |




##### Returns


- `StepsFrom`  @chainable



#### run() 








##### Returns


- `StepsFrom`  @chainable




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
