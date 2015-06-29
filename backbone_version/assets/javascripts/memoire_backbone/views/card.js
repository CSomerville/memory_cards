var Memoire = Memoire || {};

Memoire.CardView = Backbone.View.extend({

  initialize: function(options){
    _.extend(this, _.pick(options, 'image'))
  },

  events: {
    'click img': 'flip'
  },

  image: '',

  className: 'one-card col-xs-4 col-sm-2',

  flipped: true,

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