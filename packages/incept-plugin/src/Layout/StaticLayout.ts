import React from 'react'
import { RPCEmitter } from 'eventrpc'
import { EmitterContext } from 'eventrpc-react'

const emitter = new RPCEmitter('/eventrpc')

export default function StaticLayout(props: Record<string, any>) {
  return React.createElement(
    EmitterContext.Provider, 
    //@ts-ignore Type 'RPCEmitter' is not assignable to type 'null'.
    //           but that is the default value given in 
    //           `React.createContext()` in `eventrpc-react`
    { value: emitter }, 
    props.children
  )
}