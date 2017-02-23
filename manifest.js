'use strict';
const Path = require('path');

const manifest = {
    connections: [{
        port: 3000,
        labels: ['web']
    }],
    registrations: [{
            plugin: './scoreboard',
            options: {
                select: ['web']
            }
        },
        {
            plugin: 'inert',
            options: {
                select: 'web'
            }
        }
    ]
};

module.exports = manifest;
