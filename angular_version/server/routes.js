var url = require('url');
var mainControl = require('./controllers/main')

module.exports = function(req, res) {

  var path = url.parse(req.url).pathname;

  if (path === '/') mainControl.index(req, res);

  else res.end('error');
};