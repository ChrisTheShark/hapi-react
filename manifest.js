'use strict';
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
    }]
};

module.exports = manifest;
