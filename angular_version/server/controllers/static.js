var fs = require('fs');
var path = require('path');

module.exports.index = function(req, res) {

  var filepath = req.url.replace('/static', './build');

  var extname = path.extname(filepath);

  switch(extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
  }

  res.writeHead(200, {'Content-Type': contentType});

  fs.createReadStream(filepath)
    .on('error', function(err){
      if (err.code === 'ENOENT'){
        res.writeHead(404);
        res.end('Nah I do\'t have that one');
      } else {
        res.writeHead(500);
        res.end('It\'s all messed up in here.');
      }
    })
    .pipe(res)
}