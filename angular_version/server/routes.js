var url = require('url');
var mainControl = require('./controllers/main');
var apiControl = require('./controllers/api');
var staticControl = require('./controllers/static');

module.exports = function(req, res) {

  var path = url.parse(req.url).pathname;
  
  if (path === '/' && req.method === 'GET') {
    mainControl.index(req, res);
  }

  else if (path.slice(0, 7) === '/static' && req.method === 'GET'){
    staticControl.index(req, res);
  }

  else if (path === '/api/hiscores' && req.method === 'GET') {
    apiControl.index(req, res);
  }

  else res.end('error');
};