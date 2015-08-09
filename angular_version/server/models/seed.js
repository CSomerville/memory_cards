var mongoose = require('mongoose');
var models = require('./db');

function seedDb() {

  var scores = [{
    initials: 'GAK',
    turns: 8,
    elapsedTime: 52000      
  },{
    initials: 'DUB',
    turns: 11,
    elapsedTime: 88888
  },{
    initials: 'UNK',
    turns: 12,
    elapsedTime: 12000
  },{
    initials: 'BLU',
    turns: 6,
    elapsedTime: 44444
  },{
    initials: 'SIR',
    turns: 14,
    elapsedTime: 67000
  },{
    initials: 'HEY',
    turns: 13,
    elapsedTime: 123000
  },{
    initials: 'MMM',
    turns: 8,
    elapsedTime: 88881
  }];

  models.HiScore.create(scores, function(err){
    if (err) {
      console.error(err);
    } else {
      console.log('db seeded');  
      mongoose.connection.close();
    }
  })

}

models.HiScore.remove({}, function(err){
  if (err) {
    console.error(err);
  } else {
    console.log('documents dropped');
    seedDb();
  }
});