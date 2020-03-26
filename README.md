# feathers-iterate
Adds a `.iterate()` method to services in [Feathers.js](https://feathersjs.com/)

`.iterate()` creates an async [genarator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) for the **find** method on the service using given *params* which can be iterated using [for await...of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for-await...of)

## Install
```bash
npm install feathers-iterate --save
```
or
```bash
yarn add feathers-iterate
```

Configure on server and client

```javascript
const iterate = require('feathers-iterate')

app.configure(itereate())
```

Note: you must configure *feathers-iterate* **before** any services are registered.

## Use
```javascript
const genrator = app.service('messages').iterate({/* params */})

for await (let message of generator) {
  // do something with data
}
```

For pagination `iterate` uses `params.query.$skip` and `params.query.$limit`.

Next page is called when `total > $limit + $skip` with new skip as `$limit + $skip`.
