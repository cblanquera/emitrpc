import React, { useState, useEffect, useContext } from 'react';
import { EventEmitter, Request, Response } from '@inceptjs/framework';
import Exception from './Exception'

const EmitterContext = React.createContext(null);

function useEmit(event: string, req: Record<string, any>|Request) {
  Exception.require(
    typeof event === 'string', 
    'Argument 1 expected String'
  );
  Exception.require(
    req instanceof Request || req.constructor == Object,
    'Argument 2 expected Object or Request'
  );

  //Status: 100 Continue
  const [ results, setResults ] = useState(null)
  //make a response
  const res = new Response;
  //make a request
  if (!(req instanceof Request)) {
    const body = req;
    req = new Request();
    req.write(body);
  }
  //sync up params and body
  if (!req.body && req.has('params')) {
    req.write(req.get('params'));
  } else if (!req.has('params') && req.body?.constructor === Object) {
    req.set('params', req.body);
  }
  const context = useContext(EmitterContext);
  //@ts-ignore this tests the validity of emitter
  if (context === null || !(context instanceof EventEmitter)) {
    throw Exception.for(
      'Missing `<EmitterContext.Provider />` component or value of is not an `EventEmitter`'
    );
  }
  //@ts-ignore
  const emitter = context as EventEmitter;
  //normalize pattern for server and client respectively
  const effect = typeof window === 'undefined'
    ? (callback: Function) => { callback() }
    : useEffect;
  //emit the event
  effect(() => { 
    emitter.emit(event, req, res).then(() => setResults(res.body)) 
  }, []);
  //return the results
  return results;
}

export {
  EmitterContext,
  useEmit
}