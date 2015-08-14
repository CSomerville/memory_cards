angular.module('cards', [])
  .factory('cards', ['$timeout', function($timeout){
    var cards = {};

    cards.animals = ['businesscard_birdie.jpg', 'businesscard_blue_dino_luxe.jpg', 'businesscard_camel.jpg', 
                    'businesscard_cheetah.jpg', 'businesscard_deep_tiger.jpg', 'businesscard_fox.jpg',
                    'businesscard_pale_marmoset.jpg', 'businesscard_peach_kangaroo.jpg', 'businesscard_pink_giraffe.jpg'];

    cards.back = 'businesscard_back_babasouk.jpg';

    cards.makeDeck = function() {
      // doubles the array
      var deck = cards.animals.concat(cards.animals)
      // converts array of strings to array of objects with ids and flipped status
      return deck.map(function(el, index){
        return {id: index, animal: el, flipped: false, flippable: true, matched: false }
      })
    }

    // fisher-yates shuffle
    cards.shuffleDeck = function(aDeck) {
      cards.shuffled = aDeck;
      for (var index = 0, rand; index < cards.shuffled.length; index++){
        rand = Math.floor(Math.random() * index);
        if (rand !== index) {
          var tmp = cards.shuffled[index];
          cards.shuffled[index] = cards.shuffled[rand];
          cards.shuffled[rand] = tmp;
        }
      }
      return cards.shuffled;
    }

    cards.getCardIndexById = function(cardId) {
      for (var i = 0; i < cards.shuffled.length; i++) {
        if (cards.shuffled[i].id === cardId) {
          return i;
        }
      }
    }

    cards.flipCard = function(i) {
      if (cards.shuffled[i].flippable) {
        cards.shuffled[i].flipped = (cards.shuffled[i].flipped) ? false : true;
      }
    }

    cards.checkForMatch = function(i) {
      var animal = cards.shuffled[i].animal;

      for (var index = 0; index < cards.shuffled.length; index++) {
        var el = cards.shuffled[index];
        if (el.animal === animal && index !== i && el.flipped) {
          el.matched = true;
          cards.shuffled[i].matched = true;
        } else if (index !== i && el.flipped && !el.matched) {
          var j = index;
          $timeout(function(){
            cards.flipCard(j);            
          }, 1000)
        }
      }
      if (!cards.shuffled[i].matched) {
        $timeout(function(){
          cards.flipCard(i);            
        }, 1000)
      }
    }

    return cards;
  }])