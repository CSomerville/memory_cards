angular.module('play', ['cards'])
  .controller('play', ['cards', function(cards){

    var self = this;
    var counter = 0;

    self.back = cards.back;

    self.cardClicked = function(cardId) {
      counter++;
      var i = cards.getCardIndexById(cardId);
      cards.flipCard(i);

      if (counter % 2 === 0) {
        cards.checkForMatch(i);
      }
    }

    var aDeck = cards.makeDeck();
    self.shuffled = cards.shuffleDeck(aDeck);
  }]);