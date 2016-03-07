### Readme

This tutorial has been excellent, however I noticed straight away that the author was using es6 characters, `const` and `let`, as well as string interpolation, which might not be available in many environments at the time of this writing. I've set up a .babelrc file and added the Babel run-time to this project in order to access these features. Also, I recommend using Node 4.x LTS (currently Argon).

This course is currently free, so I assume posting my notes from the lesson is OK. However, if you're Mike Frey or anyone from Egghead, and don't approve of this repo, let me know.

#### Up and Running

- Create a new npm project via `npm init` -- next install Hapi, `npm -i hapi --save`
- add Nodemon, `npm -i -g nodemon`
- tell Nodemon to watch the insertion point, `nodemon -w ./ index.js`

Create an index.js file

```js
'use strict'
const Hapi = require('hapi')
const server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply('hello hapi')
  }
})

server.start(() => console.log(`Started at: ${server.info.uri}`))

```

#### Logging with Good and Good-Console

Hapi doesn't ship with logging support out of the box (other than basic console.log). Ho

- [Good](https://github.com/hapijs/good) (process monitor, listens for events from Hapi)
- [Good-Console](https://github.com/hapijs/good-console) (broadcasts events from Good)
- See also good [-file](https://github.com/hapijs/good-file),
[-http](https://github.com/hapijs/good-http), [-udp](https://github.com/hapijs/good-udp) (all officially supported by Hapi.js)
- Also several community powered reporters (winston, influx, loggly, logstash, graylog2)

#### Route Parameters

A route's path can be specified with a variety of options. In one case, we have can give specific params to be returned, `path: '/users'`, which will simply return an empty object when we request the '/users' path. If we want to return the userId for example, we can use `path: '/users/{users}'`. For flexibility, there is a *wildcard* parameter, `path: '/files/{files*}'` -- this will return anything requested from /files, for example '/files/cars/honda.jpg'.

Wildcard params can also be segmented, by appending a number to the `*` specifier. For example, `/files/{files*3}`, will accept three parameters -- 'a/b/c', and will throw an error if less than or more than the designated route segments are requested.

Hapi also supports partial segments. We can restrict matched params to specific file extensions like this, `/files/{file}.jpg`. Then, if we request `/files/honda.jpg`, the server will respond `{ file : honda }`.

The teacher also takes time to mention "path specificity" - the fact that Hapi's router evaluates routes in order from "most specific" to "least specific". Which means that the order routes are created, does not affect the order in which they are evaluated. Therefore a most general route possible would look like, `path: '/{stuff*}'` -- any request that didn't match a more specific route, would fall through to this most general one.
