var mongoose = require('mongoose');

var models = {};
module.exports = models;

var dbURI = 'mongodb://localhost/memory_cards';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function(){
  console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err){
  console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function(){
  console.log('Mongoose disconnected');
});

var gracefulShutdown = function(msg, cb){
  mongoose.connection.close(function(){
    console.log('Mongoose disconnected through ' + msg);
    cb();
  });
};

process.once('SIGUSR2', function(){
  gracefulShutdown('nodemon restart', function(){
    process.kill(process.pid, 'SIGUSR2');
  });
});

process.on('SIGINT', function(){
  gracefulShutdown('app termination', function(){
    process.exit(0);
  });
});

models.HiScore = require('./hiscores');
