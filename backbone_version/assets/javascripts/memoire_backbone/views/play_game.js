var Memoire = Memoire || {};

Memoire.PlayGameView = Backbone.View.extend({

  initialize: function(){
    this.subViews = [];
    this.model = new Memoire.ScoreModel({
      turns: 0,
      elapsed_time: new Date()
    })
  },

  adjustHeight: function(){
    this.$el.css({ 'height': $(window).innerHeight() });
  },

  className: 'game container-fluid',

  play: function(){
    var whiteScreen = new Memoire.WhiteScreenView();
    this.subViews.push(whiteScreen);
    whiteScreen.render();

    var counter = new Memoire.CounterView();
    this.subViews.push(counter);
    counter.render();
    this.$el.append(counter.el);

    counter.on('countFinished', function(){
      counter.close();
      whiteScreen.close();
    }.bind(this))

  },

  render: function(){

    this.adjustHeight();
    $(window).on('resize', function(){
      this.adjustHeight();
    }.bind(this))

    $('body').append(this.el);

    var cards = new Memoire.CardsView();
    this.subViews.push(cards);
    cards.render();
    this.$el.html(cards.el);

    this.play();
  },

  close: function(){
    this.subViews.forEach(function(view, i){
      view.close();
    });
    this.remove();
  }
})