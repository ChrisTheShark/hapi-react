'use strict';
const Path = require('path');

module.exports = {
    entry: Path.resolve(__dirname, 'scoreboard/public/js/app.js'),
    output: {
        path: Path.resolve(__dirname, 'scoreboard/public/dist/js'),
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
                test: /\.js$/,
                loader: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
