var http = require('http');
var myRoutes = require('./server/routes');

require('./server/models/db');

var server = http.createServer(myRoutes);

server.listen(3000);