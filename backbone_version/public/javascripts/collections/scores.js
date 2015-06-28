var Memoire = Memoire || {};

Memoire.ScoresCollection = Backbone.Collection.extend({
  url: '/api/scores',
  model: Memoire.ScoreModel
})