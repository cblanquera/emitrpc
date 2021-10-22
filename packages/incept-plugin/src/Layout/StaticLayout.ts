import React from 'react'
import { RPCEmitter } from 'emitrpc'
import { EmitterContext } from 'emitrpc-react'

const emitter = new RPCEmitter('/emitrpc')

export default function StaticLayout(props: Record<string, any>) {
  return React.createElement(
    EmitterContext.Provider, 
    //@ts-ignore Type 'RPCEmitter' is not assignable to type 'null'.
    //           but that is the default value given in 
    //           `React.createContext()` in `emitrpc-react`
    { value: emitter }, 
    props.children
  )
}