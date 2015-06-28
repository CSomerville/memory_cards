var Score = require('./score.js');

Score.getAll(function(err, result){
  console.log(result);
})

// var score = new Score.one({
//   initials: 'GAK',
//   turns: 9,
//   elapsed_time: 899
// })

// Score.save(score, function(err, result){

// });