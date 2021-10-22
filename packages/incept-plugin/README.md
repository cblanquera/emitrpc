# Emit RPC Incept JS Plugin

An Event RPC Incept plugin

## Install

```bash
$ npm i emitrpc-incept

or

$ yarn add emitrpc-incept
```

### Basics

In your `package.json` add `emitrpc-incept` like the following.

```json
{
  "incept": [ "emitrpc-incept" ]
}
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