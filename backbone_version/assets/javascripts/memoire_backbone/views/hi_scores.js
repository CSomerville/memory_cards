var Memoire = Memoire || {};

Memoire.HiScoresView = Backbone.View.extend({

  initialize: function(){
    this.subViews = [];
  },

  template: $('[data-template="hi-scores"]').text(),

  className: 'hi-scores container-fluid',

  adjustHeight: function(){
    this.$el.css({ 'height': $(window).innerHeight() });
  },

  render: function(){

    this.$el.html(this.template);

    this.adjustHeight();
    $(window).on('resize', function(){
      this.adjustHeight();
    }.bind(this))

    $('body').append(this.el);

    var scores = new Memoire.ScoresView({collection: new Memoire.ScoresCollection({model: Memoire.ScoreModel})});
    this.subViews.push(scores);
    this.$el.find('#scores').append(scores.el);
    scores.render();

    var demoGame = new Memoire.DemoGameView();
    this.subViews.push(demoGame);
    demoGame.$el.css({'z-index': '-2', 'position': 'absolute', 'top': '0', 'left': '0'});
    demoGame.render();
    $('body').append(demoGame.el);

    var whiteScreen = new Memoire.WhiteScreenView();
    this.subViews.push(whiteScreen);
    whiteScreen.$el.css({'z-index': '-1'});
    whiteScreen.render();
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    });
    this.remove();
  }
})