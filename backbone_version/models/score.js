// Simple model for interacting with the scores psql table.

var pg = require('pg');
var conString = "postgres://localhost/memory_cards";

var Score = {};
module.exports = Score;

// constructor function for a score model

Score.one = function(obj){
  if (obj.initials) this.initials = obj.initials;
  if (obj.turns) this.turns = obj.turns;
  if (obj.elapsed_time) this.elapsedTime = obj.elapsed_time;
  if (obj.play_time) this.playTime = obj.play_time;
};

// queries all scores in the db, returns an array of score models

Score.getAll = function(cb){
  pg.connect(conString, function(err, client, done){
    client.query('SELECT * FROM scores ORDER BY turns ASC, elapsed_time DESC;', function(err, result){
      done();
      scores = [];
      result.rows.forEach(function(row){
        scores.push(new Score.one(row));
      })
      cb(err, scores);
      done();
    })
  }) 
}

// takes a score model as argument and inserts it into the db.

Score.save = function(obj, cb){
  if (obj.initials && obj.turns && obj.elapsedTime) {
    console.log('in here')
    var queryString = "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('" + obj.initials + "'," + obj.turns +","+ obj.elapsedTime +");"
    pg.connect(conString, function(err, client, done){
      client.query(queryString, function(err, result){
        done();
        cb(err, result);
      })
    })
  }
}