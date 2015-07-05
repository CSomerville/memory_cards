var Score = require('../models/score.js');

var ScoresApi = {};
module.exports = ScoresApi;

ScoresApi.returnScores = function(req, res){
  Score.getAll(function(err, result){
    res.json(result);
  })
}

ScoresApi.saveScore = function(req, res) {
  Score.save(req.body, function(err, result){
    res.json(result);
  })
}
