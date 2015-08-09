var fs = require('fs');

mainControl = {};
module.exports = mainControl;

mainControl.index = function(req, res) {
  fs.createReadStream('./server/views/index.html').pipe(res);
}