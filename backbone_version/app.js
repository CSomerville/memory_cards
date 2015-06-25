var fs = require('fs');
var express = require('express');
var morgan = require('morgan');

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/', function(req, res){
  fs.readFile('./index.html', 'utf8', function(err, data){
    res.send(data);
  })
})

app.listen(3000, function(){
  console.log("Here I am");
})