var Memoire = Memoire || {};

Memoire.DemoGameView = Backbone.View.extend({
  initialize: function(){
    this.subViews = [];
    $('body').append(this.el);
  },

  adjustHeight: function(){
    this.$el.css({ 'height': $(window).innerHeight() });
  },

  playDemo: function(){

    this.game = setInterval(function(){

      var unflipped = _.filter($('img'), function(image){ 
        return $(image).attr('src') === "./images/businesscard_back_babasouk.jpg" 
      })

      if (unflipped.length === 0) {
        clearInterval(this.game);
      } else {
        $(_.sample(unflipped)).trigger("click");
      }


    }.bind(this), 2000)
  },

  render: function(){
    this.adjustHeight();
    $(window).on('resize', function(){
      this.adjustHeight();
    }.bind(this))

    var cards = new Memoire.CardsView();
    this.subViews.push(cards);
    this.$el.append(cards.el);
    this.playDemo();
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    if (this.game) clearInterval(this.game);
    this.remove();
  }
})