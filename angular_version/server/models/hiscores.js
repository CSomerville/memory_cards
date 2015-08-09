var mongoose = require('mongoose');

var hiScoresSchema = new mongoose.Schema({
  initials: String,
  turns: Number,
  elapsedTime: Number,
  timestamp: {type: Date, default: Date.now}
})

module.exports = mongoose.model('HiScore', hiScoresSchema);