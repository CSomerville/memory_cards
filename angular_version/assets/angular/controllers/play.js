angular.module('play', ['cards'])
  .controller('play', ['cards', function(cards){
    var self = this;
    self.back = cards.back;
    self.flipCard = cards.flipCard;

    var aDeck = cards.makeDeck();
    self.shuffled = cards.shuffleDeck(aDeck);
  }]);