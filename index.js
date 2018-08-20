/*
 * Primary file for the API.
 */

const http = require('http');
const url = require('url');
const config = require('./config');
const StringDecoder = require('string_decoder').StringDecoder;

const httpServer = http.createServer((req, res) => {
    unifiedServer(req, res);
});

httpServer.listen(config.httpPort, () => {
    console.log(`Server is running on port ${config.httpPort} in ${config.envName} mode...`);
});

const unifiedServer = function(req, res) {
    const parsedUrl = url.parse(req.url, true);

    var path = parsedUrl.pathname;
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');
    var queryStringObject = parsedUrl.query;
    var method = req.method.toUpperCase();
    var headers = req.headers;

    const decoder = new StringDecoder('utf-8');
    var buffer = '';

    req.on('data', data => {
        buffer += decoder.write(data);
    });
    req.on('end', () => {
        buffer += decoder.end();

        var chosenHandler = typeof(router[trimmedPath]) !== 'undefined' ?
            router[trimmedPath] : handlers.notFound;

        var data = {
            trimmedPath,
            queryStringObject,
            method,
            headers,
            buffer
        };

        chosenHandler(data, (statuscode, payload) => {
            statuscode = typeof(statuscode) == 'number' ? statuscode : 200;
            payload = typeof(payload) == 'object' ? payload : {};

            var payloadString = JSON.stringify(payload);
            var get = { 'method': 'GET' };
            get = JSON.stringify(get);

            res.setHeader('Content-type', 'application/json');
            res.writeHead(statuscode);
            if (method == 'POST') {
                res.end(payloadString)
            } else
                res.end();
        });
    });

    console.log(`Request received on path ${trimmedPath} with method ${method}`);
}

// Route handlers
const handlers = {};

handlers.hello = function(data, callback) {
    callback(200, { "message": "Welcome to this assignment... This is POST request" });
};

handlers.notFound = function(data, callback) {
    callback(404);
}

const router = {
    'hello': handlers.hello
}