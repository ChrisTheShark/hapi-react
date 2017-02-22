'use strict';

exports.register = function(server, options, next) {

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply('hello world!')
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
