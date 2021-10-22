# EventRPC

Event Emitter Implementation for the JSON-RPC 2.0 Specification

## Install

```bash
$ npm i eventrpc

or

$ yarn add eventrpc
```

### Basics

```js
// server.js
import { EventEmitter, middleware } from 'eventrpc'

const emitter = new EventEmitter
emitter.on('foo', (req, res) => {
  res.write({ error: false, results: { name: req.params.name } })
})

//make a server with the middleware
this.server = http.createServer(middleware(emitter))
this.server.listen(3000)
```

```js
// client.js
import { RPCEmitter } from 'eventrpc'

const emitter = new RPCEmitter('http://127.0.0.1:3000/eventrpc')
const res = await clientEmitter.emit('company-detail', { name: 'bar' })

console.log(res.body.results.name) //--> bar
```

### RPCEmitter

`RPCEmitter` extends `EventEmitter`

```ts
new RPCEmitter(endpoint: string, options: object)
```

#### Options

 - **fetch** - The `fetch()` to use; defaults to `window.fetch`
 - **id** - number; Used to make a unique ID; defaults to `1`
 - **key** - string; Used to make a unique ID; defaults to a random short ID
 - **method** - string; Options: `GET`, `POST`, `PUT`, `DELETE`, etc.
 - **mode** - string; Options: `no-cors`, `cors`, `same-origin`
 - **cache** - string; Options: `default`, `no-cache`, `reload`, `force-cache`, `only-if-cached`
 - **credentials** - string; Options: `include`, `same-origin`, `omit`
 - **headers** - A key value hash,
 - **redirect** - string; Options: `manual`, `follow`, `error`
 - **referrer** - string; Options: `no-referrer`, `client`

### Resources

 - [JSON RPC 2.0 Specification](https://www.jsonrpc.org/specification)
 - [EventEmitter Usage](https://github.com/inceptjs/incept.js/blob/canary/docs/events.md)
 - [Request and Response Specifications](https://github.com/inceptjs/incept.js/blob/canary/docs/routing.md#request-and-response)