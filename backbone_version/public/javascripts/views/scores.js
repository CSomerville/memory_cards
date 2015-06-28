var Memoire = Memoire || {};

Memoire.ScoresView = Backbone.View.extend({
  initialize: function(){
    this.listenTo(this.collection, 'add', this.addOne);
    this.collection.fetch();
  },

  template: $('[data-template="scrolling"]').text(),

  subViews: [],

  className: 'scrolling',

  addOne: function(model){
    var score = new Memoire.ScoreView({model: model});
    score.render();
    this.subViews.push(score);
    this.$el.append(score.el);
  },

  setHeight: function(ctr){
    var height = $('#scores').height();
    this.$el.css({'top': height - ctr});
  },

  render: function(){
    var ctr = 0;
    this.setHeight(ctr);
    this.$el.html(this.template);

    setInterval(function(){
      ctr += 1;
      this.setHeight(ctr);
    }.bind(this), 50)
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    this.remove();
  }
})