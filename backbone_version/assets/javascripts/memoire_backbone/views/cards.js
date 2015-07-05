var Memoire = Memoire || {};

Memoire.CardsView = Backbone.View.extend({

  initialize: function(){
    this.subViews = [];
    this.shuffleCards();
    this.clickable = true;
  },

  events: {
    'click': 'checkCards'
  },

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

  setClickabilityOnAll: function(clickable){
    this.subViews.forEach(function(view){
      view.clickable = clickable;
    })
    this.clickable = clickable;
  },

  flipAll: function(){
    this.subViews.forEach(function(view){
      view.flip();
    })
  },

  revealCards: function(){

    this.flipAll();
    this.setClickabilityOnAll(false);

    this.timer = window.setTimeout(function(){
      this.flipAll();
      this.setClickabilityOnAll(true);
    }.bind(this), 5000);

  },

  cleanUpMismatched: function(mismatched){

    this.setClickabilityOnAll(false);

    this.trigger('turnTaken');

    this.timer = window.setTimeout(function(){
      mismatched.forEach(function(card) { card.flip() });
      this.setClickabilityOnAll(true);
    }.bind(this), 1000)

  },

  setMatched: function(matched){
    _.each(_.flatten(matched), function(card){ card.matched = true })
  },

  checkCards: function(){

    if (this.clickable) {

      var flippedOverCards = _.filter(this.subViews, function(card){ if (card.flipped === false) return card});

      if (flippedOverCards.length % 2 === 0) {

        var matched = [];
        var mismatched = [];

        _.each(_.groupBy(flippedOverCards, 'image'), function(images){

          if (images.length === 1) {
            mismatched.push(images[0]);
          }

          if (images.length === 2) {
            matched.push(images);
          }
        });

        if (mismatched.length > 0) {
          this.cleanUpMismatched(mismatched);
        }
        if (matched.length > 0) {
          this.setMatched(matched);
        }
        if (matched.length === 9) {
          this.clickable = false;
          this.trigger('gameComplete');
        }
      }      
    }
  },
  
  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    window.clearTimeout(this.timer);
    this.remove();
  }
})