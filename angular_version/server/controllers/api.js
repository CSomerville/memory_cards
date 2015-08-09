var mongoose = require('mongoose');
var models = require('../models/db');

var apiControl = {};
module.exports = apiControl;

apiControl.index = function(req, res) {
  var scores = models.HiScore.find({}, function(err, docs){
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(docs));
  });
};