const http = require('http');
const app = require('./api');

const server = http.createServer(app);

server.listen(8080);
