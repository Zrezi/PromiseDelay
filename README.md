# promise-postpone

Postpone a promise from resolving until after a specified number of milliseconds occur, with an optional function to run before resolving.

## Installation

```
npm install --save promise-postpone
```

```
require('promise-postpone');
```

## API

`promise-postpone` modifies the `Promise` object, appending the key `postpone` key as a static member of `Promise` and also as a member of `Promise` instances.

##### Promise.postpone(func, time)

Creates a new `Promise` object with the specified delay.

| Argument | Optional | Description |
| :---: | :---: | --- |
| func | :heavy_check_mark: | An optional function to run before `resolve`-ing the Promise |
| time |   | The time in milliseconds to postpone for |

##### .postpone(func, time)

Chain-able version of the static function.

## Example Usage

```javascript
// as the static member
Promise.postpone(1000).then(...);

// as an instance member also passing the result
Promise.resolve("Test!").postpone(1000).then(function(result) {
  console.log(result);
});

// prints "1 Second" after 1 second
Promise.postpone(function() { console.log('1 Second'); }, 1000);
```