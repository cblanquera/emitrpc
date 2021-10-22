# EventRPC Incept JS Plugin

An Event RPC Incept plugin

## Install

```bash
$ npm i eventrpc-incept

or

$ yarn add eventrpc-incept
```

### Basics

In your `package.json` add `eventrpc-incept` like the following.

```json
{
  "incept": [ "eventrpc-incept" ]
}
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