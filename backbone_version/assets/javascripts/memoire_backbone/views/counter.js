var Memoire = Memoire || {};

Memoire.CounterView = Backbone.View.extend({

  className: 'counter',

  tagName: 'h1',

  render: function(){
    var ctr = 3;
    this.$el.text(ctr);
    this.count = setInterval(function(){
      ctr--;
      if (ctr < 1) {
        this.trigger('countFinished')
        clearInterval(this.count);
      } else {
        this.$el.text(ctr);
      }
    }.bind(this), 1000)
  },

  close: function(){
    clearInterval(this.count);
    this.remove();
  }
})