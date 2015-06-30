var Memoire = Memoire || {};

Memoire.Router = Backbone.Router.extend({

  initialize: function(){
    Backbone.history.start()
  },

  routes : {
    '': 'index',
    'hi-scores': 'hiScores',
    'play': 'play'
  },

  index: function(){
    window.location.href = '/#hi-scores';
  },

  hiScores: function(){
    if (this.view) this.view.close();
    this.view = new Memoire.HiScoresView();
    console.log(this.view);
    this.view.render();
  },

  play: function(){
    if (this.view) this.view.close();
    this.view = new Memoire.PlayGameView();
    console.log(this.view);
    this.view.render();
  }

})