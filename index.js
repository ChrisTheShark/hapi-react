'use strict';

const Glue = require('glue'),
    manifest = require('./manifest.js');

Glue.compose(manifest, {
    relativeTo: __dirname
}, (error, server) => {
    if (error) {
        throw error;
    }
    server.start(() => {
        let ports = server.connections.map(connection => {
            return connection.settings.port;
        });

        console.log('Server listening on ports: ' +
            ports);
    });
});
