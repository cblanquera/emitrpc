import React from 'react'
import { EmitterContext } from 'eventrpc-react';
import app from 'inceptjs'

export default function ServerLayout(props: Record<string, any>) {
  return React.createElement(
    EmitterContext.Provider, 
    //@ts-ignore Type 'Application' is not assignable to type 'null'.
    //           but that is the default value given in 
    //           `React.createContext()` in `eventrpc-react`
    { value: app }, 
    props.children
  )
}