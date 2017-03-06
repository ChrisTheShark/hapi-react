"use strict";

const manifest = {
    connections: [{
        port: 3000,
        labels: ['web']
    }],
    registrations: [
        {
            plugin: 'inert',
            options: {
                select: ['web']
            }
        },
        {
            plugin: './scoreboard',
            options: {
                select: ['web']
            }
        }
    ]
}

module.exports = manifest;
