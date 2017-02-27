'use strict';

exports.register = function(server, options, next) {

    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: __dirname + '/public'
            }
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
