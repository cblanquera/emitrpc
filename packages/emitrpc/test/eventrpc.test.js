const http = require('http')
const { expect } = require('chai')
const fetch = require('node-fetch')
const { EventEmitter, Request, Response, RPCEmitter, middleware } = require('../dist')

describe('Emitter Tests', () => {
  afterEach(() => {
    if (this.server) {
      this.server.close()
    }
  })
  it('Should be able to throw errors', async () => {
    //make a generic emitter for the server
    const serverEmitter = new EventEmitter
    //listen to `company-detail`
    serverEmitter.on('company-detail', (req, res) => {
      if (req.params?.id !== 1) {
        return res.write({ error: true, message: 'Not Found.'})
      }
    
      res.write({ error: false, results: { name: 'Acme' } })
    })
    //quick server emitter test
    const sreq = new Request;
    const sres = new Response;
    sreq.params.id = 1
    serverEmitter.emit('company-detail', sreq, sres)
    expect(sres.body.results.name).to.equal('Acme')
    //make a server with the middleware
    this.server = http.createServer(middleware(serverEmitter))
    this.server.listen(3000)

    //now make a client emitter
    const clientEmitter = new RPCEmitter('http://127.0.0.1:3000/emitrpc', { fetch })
    //emit the same `company-detail`
    const res1 = await clientEmitter.emit('company-detail', { id: 1 })
    //check to see if the same
    expect(res1.body.results.name).to.equal('Acme')
    //emit `company-detail` again with wrong id
    const res2 = await clientEmitter.emit('company-detail', { id: 2 })
    //check for error
    expect(res2.body.error).to.equal(true)
    expect(res2.body.message).to.equal('Not Found.')
    //now make client listen to `company-detail`
    clientEmitter.on('company-detail', (req, res) => {
      res.write({ error: false, results: { name: 'Stark Industries' } })
    })
    //emit the `company-detail` again
    const res3 = await clientEmitter.emit('company-detail', { id: 1 })
    //check to see if client was emitted
    expect(res3.body.results.name).to.equal('Stark Industries')
  })
})

