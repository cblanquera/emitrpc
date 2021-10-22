# EventRPC React Plugin

An Event RPC React hook

## Install

```bash
$ npm i eventrpc-react

or

$ yarn add eventrpc-react
```

### Basics

First wrap the `EmitterContext` around the `<App />`. Pass the 
`RPCEmitter` to the `EmitterContext` provider like the following.

```js
import React from 'react'
import { hydrate } from 'react-dom'
import { RPCEmitter } from 'eventrpc'
import { EmitterContext } from 'eventrpc'

const emitter = new RPCEmitter('/eventrpc')

hydrate(
  (
    <EmitterContext.Provider value={emitter}>
      <App />
    </EmitterContext.Provider>
  ),
  document.getElementById('__incept_root')
)
```

Next in a component use the hook `useEventRPC()` to call events 
remotely. There's no need to wrap this in `useEffect()`.

```js
import { useEventRPC } from 'eventrpc-react'

export default function About() {
  const response = useEventRPC('company-detail', { id: 1 })
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