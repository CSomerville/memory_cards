var Memoire = Memoire || {};

Memoire.WhiteScreenView = Backbone.View.extend({

  className: 'white-screen',

  adjustHeight: function(){
    this.$el.css({ 'height': $(window).innerHeight() });
  },

  render: function() {
    this.adjustHeight();
    $(window).on('resize', function(){
      this.adjustHeight();
    }.bind(this))

    $('body').append(this.el);
  },

  close: function(){
    this.remove();
  }
})