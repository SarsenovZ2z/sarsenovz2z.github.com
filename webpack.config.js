'use strict';

const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
    mode: NODE_ENV,
    entry: "./js/main.js",
    output: {
        path: __dirname + "/public",
        filename: 'js/app.js',
    },
    watch: NODE_ENV == 'development',
}
