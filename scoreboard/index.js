'use strict';

exports.register = function(server, options, next) {

    server.route({
        method: 'GET',
        path: '/{filename}',
        handler: (request, reply) => {
            reply.file(__dirname + '/public/' + request.params.filename);
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, reply) => {
            reply.file(__dirname + '/public/index.html');
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
