var http = require('http');
var myRoutes = require('./server/routes');

var server = http.createServer(myRoutes);

server.listen(3000);