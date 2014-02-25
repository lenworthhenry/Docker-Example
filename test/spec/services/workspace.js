var expect = require('expect.js')
var superagent = require('superagent')

describe('express rest api server', function(){
var id
it('retrieves an object', function(done){
    superagent.get('http://localhost:3000/api/workspaces/1')
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null)
        expect(typeof res.body).to.eql('object')
        expect(res.body._id.length).to.eql(24)
        expect(res.body._id).to.eql(id)
        done()
      })
  })
})


results
0 passing (17ms)
  1 failing

  1) express rest api server retrieves an object:
     Uncaught Error: expected { code: 'ECONNREFUSED',
  errno: 'ECONNREFUSED',
  syscall: 'connect' } to sort of equal null
      at Assertion.assert
(/home/toobz/Documents/LawNovo/workspace/node_modules/expect.js/expect.js:99:13)
      at Assertion.eql
(/home/toobz/Documents/LawNovo/workspace/node_modules/expect.js/expect.js:214:10)
      at
/home/toobz/Documents/LawNovo/workspace/test/spec/services/workspace.js:10:22
      at Request.callback
(/home/toobz/Documents/LawNovo/workspace/node_modules/superagent/lib/node/index.js:628:30)
      at ClientRequest.<anonymous>
(/home/toobz/Documents/LawNovo/workspace/node_modules/superagent/lib/node/index.js:596:10)
      at ClientRequest.EventEmitter.emit (events.js:95:17)
      at Socket.socketErrorListener (http.js:1548:9)
      at Socket.EventEmitter.emit (events.js:95:17)
      at net.js:441:14
      at process._tickCallback (node.js:415:13)

