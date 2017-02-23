'use strict';

exports.register = function(server, options, next) {

    server.route({
        method: 'GET',
        path: '/{filename}',
        handler: (request, reply) => {
            reply.file(__dirname + '/public/' + request.params.filename);
        }
    });

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};
