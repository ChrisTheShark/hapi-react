'use strict';
const Glue = require('glue'),
    manifest = require('./manifest');

Glue.compose(manifest, {
        relativeTo: __dirname
    },
    (error, server) => {
        if (error) throw error;
        server.start(() => {});
    }
);
