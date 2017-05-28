'use strict';

const Hapi = require('hapi');
const fs = require('fs');
const path = require('path');

const server = new Hapi.Server();

const tls = {
  key: fs.readFileSync(path.join(__dirname, '../keys/key.pem'), 'utf8'),
  cert: fs.readFileSync(path.join(__dirname, '../keys/cert.pem'), 'utf8')
};

server.connection({ port: 3000, host: 'localhost', tls: tls });

server.register(require('inert'), (err) => {
  if (err) throw err;
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply.file('./public/login.html');
    }
  });
});

server.start((err) => {
  if (err) throw err;
  console.log(`Server running at: ${server.info.uri}`);
});
