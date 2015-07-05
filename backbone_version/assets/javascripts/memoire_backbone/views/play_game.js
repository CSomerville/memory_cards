var Memoire = Memoire || {};

Memoire.PlayGameView = Backbone.View.extend({

  initialize: function(){
    this.subViews = [];
    this.model = new Memoire.ScoreModel({
      turns: 1,
      elapsed_time: new Date()
    })

    // this triggers a cheat used in development
    this.input = [];
    $(window).on('keydown', this.blazeThrough.bind(this));
  },

  adjustHeight: function(){
    this.$el.css({ 'height': $(window).innerHeight() });
  },

  className: 'game container-fluid',

  play: function(){

    var whiteScreen = new Memoire.WhiteScreenView();
    this.subViews.push(whiteScreen);
    whiteScreen.render();

    var counter = new Memoire.CounterView();
    this.subViews.push(counter);
    counter.render();
    this.$el.append(counter.el);

    counter.on('countFinished', function(){
      counter.close();
      whiteScreen.close();
      var cards = _.find(this.subViews, function(view) { return view.subViews.length === 18 })
      cards.revealCards();

      cards.on('turnTaken', function(){
        this.model.set('turns', this.model.get('turns') + 1 )
      }.bind(this))

      cards.on('gameComplete', function(){

        this.model.set('elapsed_time', new Date() - this.model.get('elapsed_time'))
        var gameEnd = new Memoire.GameEndView({
          model: this.model,
          collection: new Memoire.ScoresCollection({ model: Memoire.ScoreModel })
        });

        this.subViews.push(gameEnd);

      }.bind(this))
    }.bind(this))

  },

// cheat code to aid in development
  blazeThrough: function(event){

    var ans = [66, 76, 65, 90, 69];

    this.input.push(event.keyCode);

    if (this.input.length >= 5) {
      if (_.intersection(this.input, ans).length === 5) {
        var cards = _.find(this.subViews, function(view) { return view.subViews.length === 18 })

        while (_.has(_.groupBy(cards.subViews, 'matched'), 'false')) {
          var one = _.sample(_.groupBy(cards.subViews, 'matched').false)
          one.$el.find('img').trigger('click')

          var other = _.find(cards.subViews, function(e) { return e.image === one.image && e.cid !== one.cid })
          other.$el.find('img').trigger('click');
        }  
      }
    }
  },

  render: function(){

    this.adjustHeight();
    $(window).on('resize', function(){
      this.adjustHeight();
    }.bind(this))

    $('body').append(this.el);

    cards = new Memoire.CardsView();
    this.subViews.push(cards);
    cards.render();
    this.$el.html(cards.el);

    this.play();
  },

  close: function(){
    this.subViews.forEach(function(view, i){
      view.close();
    });
    if (this.timer) window.clearTimeout(this.timer);
    this.remove();
  }
})