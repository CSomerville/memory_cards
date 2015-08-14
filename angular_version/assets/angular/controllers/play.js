angular.module('play', ['cards'])
  .controller('play', ['cards', function(cards){
    var self = this;
    self.back = cards.back;

    self.cardClicked = function(cardId) {
      console.log('in here')
      cards.flipCard(cardId);
      cards.checkForMatch();
    }

    var aDeck = cards.makeDeck();
    self.shuffled = cards.shuffleDeck(aDeck);
  }]);