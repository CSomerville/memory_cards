var Memoire = Memoire || {};

Memoire.NewHighScoreView = Backbone.View.extend({

  events: {
    'input input': 'uppercase',
    'submit': 'saveScore'
  },

  template: $('[data-template="new-hi-score"]').text(),

  uppercase: function(){
    $('#initials-input').val($('#initials-input').val().replace(/[^a-z,A-Z]/g, "").toUpperCase());
  },

  saveScore: function(event){
    event.preventDefault();
    this.model.set('initials', $('#initials-input').val());
    this.model.save(null, {success: function(){
      window.location.href = '/#hi-scores';
    }});
  },

  render: function(){
    this.$el.html(this.template);
  },

  close: function(){
    this.remove();
  }
})