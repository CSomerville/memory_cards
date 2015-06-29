var Memoire = Memoire || {};

Memoire.CardsView = Backbone.View.extend({

  initialize: function(){
    this.shuffleCards();
  },

  events: {
    'click': 'checkCards'
  },

  subViews: [],

  className: 'all-cards',

  animals: ['businesscard_birdie.jpg', 'businesscard_blue_dino_luxe.jpg', 'businesscard_camel.jpg', 
  'businesscard_cheetah.jpg', 'businesscard_deep_tiger.jpg', 'businesscard_fox.jpg',
  'businesscard_pale_marmoset.jpg', 'businesscard_peach_kangaroo.jpg', 'businesscard_pink_giraffe.jpg'],

  shuffleCards: function(){

    var images = _.flatten(_.times(2, function(){return _.shuffle(this.animals)}.bind(this)))

    _.each(images, function(image){
      var card = new Memoire.CardView({image: image});
      this.subViews.push(card);
      card.render();
      this.$el.append(card.el);
    }.bind(this))
  },

  checkCards: function(){
    var flippedOverCards = _.filter(this.subViews, function(card){ if (card.flipped === false) return card});

    if (flippedOverCards.length % 2 === 0) {
      _.each(_.groupBy(flippedOverCards, 'image'), function(images){
        if (images.length === 1) {
          window.setTimeout(images[0].flip.bind(images[0]), 1000);
        }
      })
    }
  },
  
  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    this.remove();
  }
})








