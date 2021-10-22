# Emit RPC React Plugin

An Emit RPC React hook

## Install

```bash
$ npm i emitrpc-react

or

$ yarn add emitrpc-react
```

### Basics

First wrap the `EmitterContext` around the `<App />`. Pass the 
`RPCEmitter` to the `EmitterContext` provider like the following.

```js
import React from 'react'
import { hydrate } from 'react-dom'
import { RPCEmitter } from 'emitrpc'
import { EmitterContext } from 'emitrpc-react'

const emitter = new RPCEmitter('/emitrpc')

hydrate(
  (
    <EmitterContext.Provider value={emitter}>
      <App />
    </EmitterContext.Provider>
  ),
  document.getElementById('__incept_root')
)
```

Next in a component use the hook `useEmit()` to call events 
remotely. There's no need to wrap this in `useEffect()`.

```js
import { useEmit } from 'emitrpc-react'

export default function About() {
  const response = useEmit('company-detail', { id: 1 })
  if (!response) {
    return <h1>Loading...</h1>
  }
  return <h1>About {response.results.name}</h1>
}
```

### Resources

 - [JSON RPC 2.0 Specification](https://www.jsonrpc.org/specification)
 - [EventEmitter Usage](https://github.com/inceptjs/incept.js/blob/canary/docs/events.md)
 - [Request and Response Specifications](https://github.com/inceptjs/incept.js/blob/canary/docs/routing.md#request-and-response)