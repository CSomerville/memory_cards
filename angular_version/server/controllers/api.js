var mongoose = require('mongoose');
var models = require('../models/db');

var apiControl = {};
module.exports = apiControl;

apiControl.index = function(req, res) {
  models.HiScore.
    find().
    limit(20).
    sort('turns').
    exec(function(err, docs){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(docs));
  });
};

apiControl.create = function(req, res) {
  var body = '';
  req.on('data', function(data){
    body += data;
  });
  req.on('end', function (){
    var post = JSON.parse(body);
    var hiScore = new models.HiScore(post);
    hiScore.save(function (err){
      if (err) {
        res.writeHead(500);
        res.end("Internal server error");
      } else {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.end(JSON.stringify(post));
      }
    })
  })
}