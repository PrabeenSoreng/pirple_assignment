/*
 * Primary file for the API.
 */

const http = require('http');
const url = require('url');
const config = require('./config');

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

    res.end('Hello');
    console.log(`Request received on path ${trimmedPath} with method ${method}`);
}