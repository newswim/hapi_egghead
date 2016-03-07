'use strict'

const Hapi = require('hapi')

const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

function handler(request, reply) {
  reply(request.params)
}

server.route({
  method: 'GET',
  path: '/files/{files*2}',   // see notes on *wildcard* parameters
  handler: handler
})

server.start(() => console.log(`Started at: ${server.info.uri}`))
