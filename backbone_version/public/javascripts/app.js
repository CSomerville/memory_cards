var Memoire = Memoire || {};

Memoire.Router = Backbone.Router.extend({

  initialize: function(){
    Backbone.history.start()
  },

  routes : {
    '': 'index',
    'hi-scores': 'hiScores',
    'play': 'play'
  },

  index: function(){
    window.location.href = '/#hi-scores';
  },

  hiScores: function(){
    if (this.view) this.view.close();
    this.view = new Memoire.HiScoresView();
    this.view.render();
  },

  play: function(){
    if (this.view) this.view.close();
    this.view = new Memoire.PlayGameView();
    this.view.render();
  }

})
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
var Memoire = Memoire || {};

Memoire.DemoGameView = Backbone.View.extend({
  initialize: function(){
    this.subViews = [];
    $('body').append(this.el);
  },

  playDemo: function(){

    this.game = setInterval(function(){

      var unflipped = _.filter($('img'), function(image){ 
        return $(image).attr('src') === "./images/businesscard_back_babasouk.jpg" 
      })

      if (unflipped.length === 0) {
        clearInterval(this.game);
      } else {
        $(_.sample(unflipped)).trigger("click");
      }


    }.bind(this), 2000)
  },

  render: function(){
    var cards = new Memoire.CardsView();
    this.subViews.push(cards);
    this.$el.append(cards.el);
    this.playDemo();
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    if (this.game) clearInterval(this.game);
    this.remove();
  }
})
var Memoire = Memoire || {};

Memoire.GameEndView = Backbone.View.extend({

  initialize: function(){
    this.listenTo(this.collection, 'update', this.checkHiScores);
    this.collection.fetch();

    this.subViews = [];
    this.hiScore = false;

    this.timer = window.setTimeout(this.render.bind(this), 2000);
  },

  template: $('[data-template="game-end"]').text(),

  className: 'game-end container-fluid',

  adjustHeight: function(){
    this.$el.css({ 'height': $(window).innerHeight()});
  },

  checkHiScores: function(){
    var maxTurns = this.collection.max( function(e) { return e.get('turns') })

    if (this.collection.length < 20) {
      this.newHighScore();
    } else if (this.model.get('turns') < maxTurns.get('turns')) {
      this.newHighScore();
    } else if (this.model.get('turns') === maxTurns.get('turns') &&
      this.model.get('elapsed_time') > maxTurns.get('elapsed_time')) {
      this.newHighScore();
      
    }
  },

  newHighScore: function(){
    this.hiScore = true;
  },

  render: function(){

    var whiteScreen = new Memoire.WhiteScreenView();
    this.subViews.push(whiteScreen);
    whiteScreen.render();

    var plural = (this.model.get('turns') > 1)? 's' : '';

    var options = {
      plural: plural,
      turns: this.model.get('turns'),
      elapsed_time: Math.round(this.model.get('elapsed_time') / 1000)
    }

    this.$el.html(Mustache.render(this.template, options));

    this.adjustHeight();
    $(window).on('resize', function(){
      this.adjustHeight();
    }.bind(this))

    if (this.hiScore) {
      var newHighScoreView = new Memoire.NewHighScoreView({model: this.model});
      this.subViews.push(newHighScoreView);
      newHighScoreView.render();
      this.$el.find(".game-end-main").html(newHighScoreView.el);
    }

    $('body').append(this.el);

    if (this.hiScore) $('#initials-input').focus();
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    })
    window.clearTimeout(this.timer);
    this.remove();
  }
})
var Memoire = Memoire || {};

Memoire.HiScoresView = Backbone.View.extend({

  initialize: function(){
    this.subViews = [];
  },

  template: $('[data-template="hi-scores"]').text(),

  className: 'hi-scores container-fluid',

  adjustHeight: function(){
    this.$el.css({ 'height': $(window).innerHeight() });
  },

  render: function(){

    this.$el.html(this.template);

    this.adjustHeight();
    $(window).on('resize', function(){
      this.adjustHeight();
    }.bind(this))

    $('body').append(this.el);

    var scores = new Memoire.ScoresView({collection: new Memoire.ScoresCollection({model: Memoire.ScoreModel})});
    this.subViews.push(scores);
    this.$el.find('#scores').append(scores.el);
    scores.render();

    var demoGame = new Memoire.DemoGameView();
    this.subViews.push(demoGame);
    demoGame.$el.css({'z-index': '-2', 'position': 'absolute', 'top': '0', 'left': '0'});
    demoGame.render();
    $('body').append(demoGame.el);

    var whiteScreen = new Memoire.WhiteScreenView();
    this.subViews.push(whiteScreen);
    whiteScreen.$el.css({'z-index': '-1'});
    whiteScreen.render();
  },

  close: function(){
    this.subViews.forEach(function(view){
      view.close();
    });
    this.remove();
  }
})
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
var Memoire = Memoire || {};

Memoire.ScoresView = Backbone.View.extend({
  initialize: function(){
    this.subViews = [];
    this.listenTo(this.collection, 'add', this.addOne);
    this.collection.fetch();
  },

  template: $('[data-template="scrolling"]').text(),

  className: 'scrolling',

  addOne: function(model){
    var score = new Memoire.ScoreView({model: model});
    score.render();
    this.subViews.push(score);
    this.$el.append(score.el);
  },

  setHeight: function(ctr){
    var displayHeight = $('#scores').height();
    var scrollingHeight = this.$el.height();
    var difference = displayHeight + scrollingHeight
    this.$el.css({'top': displayHeight - ctr % difference});
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
var Memoire = Memoire || {};

Memoire.ScoresCollection = Backbone.Collection.extend({
  url: '/api/scores',
})
var Memoire = Memoire || {};

Memoire.ScoreModel = Backbone.Model.extend({
  url: '/api/scores'
})
// create backbone router on page load.

$(function(){
  new Memoire.Router();  
})