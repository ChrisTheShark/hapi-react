'use strict';
const Hapi = require('hapi'),
      server = new Hapi.Server();

server.connection({ port: 3000, host: 'localhost' });

server.register(require('inert'), error => {
  if (error) throw error;
});

server.register(require('./scoreboard'), error => {
  if (error) throw error;
});

server.start(error => {
  if (error) throw error;
  console.log(`Server running at: ${server.info.uri}.`);
});
