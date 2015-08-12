angular.module('cards', [])
  .factory('cards', function(){
    var cards = {};

    cards.animals = ['businesscard_birdie.jpg', 'businesscard_blue_dino_luxe.jpg', 'businesscard_camel.jpg', 
                    'businesscard_cheetah.jpg', 'businesscard_deep_tiger.jpg', 'businesscard_fox.jpg',
                    'businesscard_pale_marmoset.jpg', 'businesscard_peach_kangaroo.jpg', 'businesscard_pink_giraffe.jpg'];


    cards.shuffleDeck = function() {
      // doubles the array
      cards.shuffled = cards.animals.concat(cards.animals)
      // fisher-yates shuffle
      for (var index = 0, rand; index < cards.shuffled.length; index++){
        rand = Math.floor(Math.random() * index);
        if (rand !== index) {
          var tmp = cards.shuffled[index];
          cards.shuffled[index] = cards.shuffled[rand];
          cards.shuffled[rand] = tmp;
        }
      }
    }

    return cards;
  })