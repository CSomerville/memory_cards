angular.module('play', ['cards'])
  .controller('play', ['cards', function(cards){
    var self = this;

    cards.shuffleDeck();
    self.shuffled = cards.shuffled.map(function(el, i){
      return {id: i, animal: el};
    });
    console.log(self.shuffled);
  }]);