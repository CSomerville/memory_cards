angular.module('cards', [])
  .factory('cards', function(){
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
        return {id: index, animal: el, flipped: false, flippable: true }
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

    cards.flipCard = function(cardId) {
      for (var i = 0; i < cards.shuffled.length; i++) {
        if (cards.shuffled[i].id === cardId && 
          cards.shuffled[i].flippable) {
          cards.shuffled[i].flipped = (cards.shuffled[i].flipped === true) ? false : true;
          break;
        }
      }
    }

    cards.checkForMatch = function() {
      var unmatched = [];
      cards.shuffled.forEach(function(el){
        if (el.flipped) {
          if (unmatched.indexOf(el.animal) === -1) {
            unmatched.push(el.animal);
          } else {
            unmatched.splice(unmatched.indexOf(el.animal), 1);
          }
        }
      })
      console.log(unmatched);
    }

    return cards;
  })