var Memoire = Memoire || {};

Memoire.CardView = Backbone.View.extend({

  initialize: function(options){
    this.clickable = true;
    this.flipped = true;
    this.matched = false;
    _.extend(this, _.pick(options, 'image'))
  },

  events: {
    'click img': 'touchCard'
  },

  className: 'one-card col-xs-4 col-sm-2',

  touchCard: function(){
    if (this.clickable && !this.matched) this.flip();
  },

  flip: function(){     
    this.flipped = this.flipped === true ? false : true;
    this.render();
  },

  render: function(){
    if (this.flipped){
      this.$el.html('<img src="./images/businesscard_back_babasouk.jpg">');
    } else {
      this.$el.html('<img src="./images/' + this.image + '">');
    }
  },

  close: function(){
    this.remove();
  }
})