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
        if (cards.shuffled[i].flipped) {
          toggleFlippable(i, false);
          return true;
        }
      } else {
        // tells the controller if it wasn't flippable.
        return false;
      }
    }

    cards.setFlippableAll = function(value){
      cards.shuffled.forEach(function(el, i){
        if (!el.matched) toggleFlippable(i, value);
      })
    }

    cards.allFlipped = function(){
      for (var i = 0; i < cards.shuffled.length; i++) {
        if (!cards.shuffled[i].flipped) {
          return false;
        }
      }
      return true;
    }

    var toggleFlippable = function(i, value){
      cards.shuffled[i].flippable = value;
    }

    var setMatched = function(i) {
      cards.shuffled[i].matched = true;
      toggleFlippable(i, false);
    }

    cards.checkForMatch = function(i) {
      // holds candidate string to look for match;
      var animal = cards.shuffled[i].animal;

      for (var index = 0; index < cards.shuffled.length; index++) {
        var el = cards.shuffled[index];

        // if match found
        if (el.animal === animal && index !== i && el.flipped) {
          setMatched(index);
          setMatched(i);
          return true;

        // if card is flipped and doesn't match, turn them both back over
        } else if (index !== i && el.flipped && !el.matched) {
          cards.setFlippableAll(false);
          $timeout(function(){
            cards.setFlippableAll(true);
            // toggleFlippable(index, true);
            // toggleFlippable(i, true);
            cards.flipCard(index);            
            cards.flipCard(i);            
          }, 1000)
          return false;
        }
      }
    }

    return cards;
  }])