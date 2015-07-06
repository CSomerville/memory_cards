var fs = require('fs');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');

var scoresApi = require('./controllers/scores.js');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(req, res){
  fs.readFile('./index.html', 'utf8', function(err, data){
    res.send(data);
  })
})

app.get('/api/scores', scoresApi.returnScores)

app.post('/api/scores', scoresApi.saveScore);

app.listen(8000, function(){
  console.log("Here I am");
})