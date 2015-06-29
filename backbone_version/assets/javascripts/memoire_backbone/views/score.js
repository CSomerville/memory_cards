var Memoire = Memoire || {};

Memoire.ScoreView = Backbone.View.extend({

  template: $('[data-template="score"]').text(),

  className: 'row',

  render: function(){
    var options = {
      initials: this.model.get('initials'),
      turns: this.model.get('turns'),
      elapsedTime: Math.round( this.model.get('elapsedTime') / 1000 )
    }
    this.$el.html(Mustache.render(this.template, options));
  },

  close: function(){
    this.remove();
  }
})