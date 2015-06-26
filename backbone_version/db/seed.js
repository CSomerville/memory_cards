var pg = require('pg');

var conString = "postgres://localhost/memory_cards";

var client = new pg.Client(conString);
client.connect(function(err){
  if (err) {
    return console.error('could not connect to pg db', err);
  }

  client.query('DELETE FROM scores;', function(err, result){

    if (err) {
      return console.error('could not delete from scores', err);
    }

    var seedQuery = "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('CWS', 7, 22000);"
    seedQuery += "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('RHK', 3, 11000);"
    seedQuery += "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('BLU', 5, 12345);"
    seedQuery += "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('MMM', 3, 28713);"
    seedQuery += "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('GAG', 4, 5123);"
    seedQuery += "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('ULF', 5, 12239);"
    seedQuery += "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('FMG', 2, 26020);"
    seedQuery += "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('SPL', 11, 30000);"
    seedQuery += "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('JUC', 4, 9876);"
    seedQuery += "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('WUP', 8, 17089);"
    seedQuery += "INSERT INTO scores (initials, turns, elapsed_time) VALUES ('PMP', 3, 11503);"


    client.query(seedQuery, function(err, result){
      if (err) {
        return console.error('errored on seeds', err);
      }
      client.end();
    })

  })
})