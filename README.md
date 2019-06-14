# blackbird-utils
Helpers for React projects

## Installation
```
npm install --save @blackbird/utils
```

## Usage
Import individual helpers from `@blackbird/utils`, for example:
```
import {log, mapToObject} from '@blackbird/utils'

...
```

## API

#### Functional helpers
* [tap()](#tap)
* [log()](#log)
* [reversed()](#reversed)
* [ensureArray()](#ensurearray)
* [callWith()](#callwith)
* [removeProps()](#removeprops)
* [mapToObject()](#maptoobject)
* [interleave()](#interleave)
* [fmapWithKey()](#fmapwithkey)
* [fmapValuesWithKey()](#fmapvalueswithkey)
* [feachWithKey()](#feachwithkey)
* [fflatMapWithKey()](#fflatmapwithkey)

### `tap()`

```js
tap(
  callback: (value: any) => ignored: any
): Function
```

A helper whose return value is a function that calls the supplied callback with its argument and returns that argument.
Often used for performing side effects within a functional pipeline

For example:
```js
import {flow} from 'lodash/fp'

const repeatTitle = flow(
  title => `${title} ${title}`,
  tap(repeatedTitle => {
    document.title = repeatedTitle
  }),
  repeatedTitle => `${repeatedTitle}!`
)

repeatTitle("bye") // returns "bye bye!" and sets document title to "bye bye"
```

`tap()` is a standard functional helper, see the [Ruby](https://apidock.com/ruby/Object/tap) and [Ramda](https://ramdajs.com/0.21.0/docs/#tap) versions

### `log()`

```js
log(
  loggingKey: string
): Function
```

A helper whose return value is a function that logs its argument to the console under the given key and returns that argument.
Useful for debugging functional pipelines

For example:
```js
import {flow} from 'lodash/fp'

const complicatedPipeline = flow(
  log('initial'),
  val => val * 2,
  log('doubled'),
  doubledVal => doubledVal + 4,
  log('added'),
  addedVal => addedVal ? 'yes' : 'no'
)

complicatedPipeline(-2) // returns "no" and logs the equivalent of the following to the console:
// console.log({initial: -2})
// console.log({doubled: -4})
// console.log({added: 0})
```

### `reversed()`

```js
reversed(
  array: Array<any>
): Function
```

Returns a new array which is the reversed version of its argument. Doesn't mutate its argument

For example:
```js
reversed([1, 2, 3]) // returns [3, 2, 1]
```

### `ensureArray()`

```js
ensureArray(
  arrayOrScalar: any
): Array<any>
```

If passed an array, returns that array. If passed anything else, returns a single-element array whose only element is that argument

For example:
```js
ensureArray([1, 2, 3]) // returns [1, 2, 3]
ensureArray('abc') // returns ['abc']
```

### `callWith()`

```js
callWith(
  argument: any
  ...
): Function
```

Returns a function which expects to get passed a function and applies the original arguments to that function

For example:
```js
callWith(1, 2)((a, b) => a + b) // returns 3
```

### `removeProps()`

```js
removeProps(
  propNameOrArrayOfPropNames: string | Array<string>
): Function
```

Returns a function which expects an object and returns a new copy of that object without the properties under the supplied keys

For example:
```js
removeProps('a')({a: 1, b: 2}) // returns {b: 2}
removeProps(['a', 'b'])({a: 1, b: 2, c: 3}) // returns {c: 3}
```

### `mapToObject()`

```js
mapToObject(
  callback: (value: any, key: string) => [key: string, value: any]
): Function
```

Returns a function which "maps" the supplied callback to every element in its argument and builds a single object as its return value. The callback should return a two-element `[key, value]` array in the style of [`fromPairs()`](https://lodash.com/docs/4.17.11#fromPairs)

For example:
```js
mapToObject((val, key) => [`${key}${val}`, `${val}${key}`])({a: 1, b: 2}) // returns {a1: '1a', b2: '2b'}
```

### `interleave()`

```js
interleave(
  callback: ({following: any}) => any
): Function
```

Returns a function which returns a new array with the results of calling the supplied callback "interleaved" between the elements of the array argument. The callback receives a `following` option-style argument which is the following array element

For example:
```js
interleave(() => 'and then')(['a', 'b', 'c']) // returns ['a', 'and then', 'b', 'and then', 'c']
interleave(
  ({following}) => `the next item will be ${following}`
)(['a', 'b', 'c']) // returns ['a', 'the next item will be b', 'b', 'the next item will be c', 'c']
```
