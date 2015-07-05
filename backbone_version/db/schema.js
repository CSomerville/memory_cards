var pg = require('pg');

var conString = "postgres://localhost/memory_cards";

console.log(pg.defaults);

var client = new pg.Client(conString);
client.connect(function(err){
  if(err) {
    return console.error('could not connect', err);
  }

  client.query('DROP TABLE scores;', function(err, result){

    if (err) {
      return console.error('error dropping tables', err);
    }

    client.query('CREATE TABLE scores (initials varchar, turns int, elapsed_time int, play_time timestamp DEFAULT current_timestamp);', function(err, result){
      if (err){
        return console.error('error running query', err);      
      }
      console.log(result);
      client.end();
    });

    
  })

});