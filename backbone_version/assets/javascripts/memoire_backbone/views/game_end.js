var Memoire = Memoire || {};

Memoire.GameEndView = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.collection, 'update', this.checkHiScores);
    this.collection.fetch();

    this.subViews = [];
    this.hiScore = false;

    this.timer = window.setTimeout(this.render.bind(this), 2000);
  },

  template: $('[data-template="game-end"]').text(),

  className: 'game-end container-fluid',

  adjustHeight: function(){
    this.$el.css({ 'height': $(window).innerHeight()});
  },

  checkHiScores: function(){
    var maxTurns = this.collection.max( function(e) { return e.get('turns') })

    if (this.collection.length < 20) {
      this.newHighScore();
    } else if (this.model.get('turns') < maxTurns.get('turns')) {
      this.newHighScore();
    } else if (this.model.get('turns') === maxTurns.get('turns') &&
      this.model.get('elapsed_time') > maxTurns.get('elapsed_time')) {
      this.newHighScore();
      
    }
  },

  newHighScore: function(){
    this.hiScore = true;
  },

  render: function(){

    var whiteScreen = new Memoire.WhiteScreenView();
    this.subViews.push(whiteScreen);
    whiteScreen.render();

    var plural = (this.model.get('turns') > 1)? 's' : '';

    var options = {
      plural: plural,
      turns: this.model.get('turns'),
      elapsed_time: Math.round(this.model.get('elapsed_time') / 1000)
    }

    this.$el.html(Mustache.render(this.template, options));

    this.adjustHeight();
    $(window).on('resize', function(){
      this.adjustHeight();
    }.bind(this))

    if (this.hiScore) {
      var newHighScoreView = new Memoire.NewHighScoreView({model: this.model});
      this.subViews.push(newHighScoreView);
      newHighScoreView.render();
      this.$el.find(".game-end-main").html(newHighScoreView.el);
    }

    $('body').append(this.el);

    if (this.hiScore) $('#initials-input').focus();
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    window.clearTimeout(this.timer);
    this.remove();
  }
})