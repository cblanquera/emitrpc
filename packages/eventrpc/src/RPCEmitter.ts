import jsonrpc from 'jsonrpc-lite';
import shortid from 'shortid';
import { 
  EventEmitter, 
  Statuses, 
  Exception,
  Request,
  Response,
  Status
} from '@inceptjs/framework';

export type RPCOptions = {
  fetch?: Function,
  id?: number,
  key?: string,
  method?: string, // *GET, POST, PUT, DELETE, etc.
  mode?: string, // no-cors, cors, *same-origin
  cache?: string, // *default, no-cache, reload, force-cache, only-if-cached
  credentials?: string, // include, *same-origin, omit
  headers?: Record<string, any>,
  redirect?: string, // manual, *follow, error
  referrer?: string, // no-referrer, *client
  body?: string
}

const defaults = {
  method: 'POST', 
  mode: 'cors', 
  cache: 'no-cache',
  credentials: 'same-origin', 
  headers: {
    'Content-Type': 'application/json'
  },
  redirect: 'follow',
  referrer: 'no-referrer'
}

class ResponseStatus extends Response implements Status {
  public text: string = Statuses.OK.text
}

export default class RPCEmitter extends EventEmitter {
  /**
   * Used to make a unique ID 
   */
  protected _id: number;

  /**
   * The endpoint URL to use when fetching
   */
  protected _endpoint: string;

  /**
   * The fetch method
   */
  protected _fetch: Function;

  /**
   * Used to make a unique ID 
   */
  protected _key: string;

  /**
   * The fetch options
   */
  protected _options: RPCOptions;
  
  /**
   * Setups the RPC
   */
  constructor(endpoint: string, options: RPCOptions = {}) {
    super();
    this._endpoint = endpoint;
    //extract non fetch options
    const { id, key, fetch, ...fetchOptions } = options;
    this._id = id || 1;
    this._key = key || shortid.generate();
    this._fetch = fetch || window.fetch.bind(window);
    this._options = Object.assign({}, defaults, fetchOptions);
  }

  /**
   * Calls all the callbacks of the given event passing the given arguments
   */
  async emit(
    event: string, 
    req: Record<string, any>|Request, 
    res: Response = new Response
  ) {
    Exception.require(
      typeof event === 'string', 
      'Argument 1 expected String'
    );
    Exception.require(
      req instanceof Request || req.constructor == Object,
      'Argument 2 expected Object or Request'
    );
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
    //swap response for response status
    const ress = new ResponseStatus(res.get());

    //try to emit locally first
    const status = await super.emit.call(this, event, req, ress);
    if (status.code !== Statuses.NOT_FOUND.code) {
      return ress;
    }

    //make a new id
    const id = this._id++;
    //clone the config so we can add a body
    const config = Object.assign({}, this._options);
    //make a new RPC ID
    const rpcid = this._key ? (this._key + '-' + id): id;
    //populate the body
    config.body = JSON.stringify(jsonrpc.request(rpcid, event, req.body));
    //call it out
    const response = await this._fetch(this._endpoint, config);
    //and fetch the results (expect JSON because of JSON RPC)
    const payload = await response.json();

    if (payload.error) {
      throw new Error(payload.error.message || 'Unknown Server Error');
    }

    if (typeof payload.result === 'undefined' || payload.result === null ) {
      payload.result = {
        error: true,
        code: Statuses.NOT_FOUND.code,
        message: Statuses.NOT_FOUND
      }
    }

    ress.write(payload.result);
    return ress;
  }
}

