angular.module('play', ['cards'])
  .controller('play', ['cards', '$timeout', function(cards, $timeout){

    var self = this;
    var counter = 0;
    var lastCount;

    self.back = cards.back;

    self.cardClicked = function(cardId) {
      var i = cards.getCardIndexById(cardId);
      if (cards.flipCard(i)) counter ++;

      if (counter % 2 === 0 && counter !== 0 && counter !== lastCount) {
        cards.checkForMatch(i);
        lastCount = counter
      }
    }

    var aDeck = cards.makeDeck();
    self.shuffled = cards.shuffleDeck(aDeck);

    var flipAll = function() {
      for (var i = 0; i < self.shuffled.length; i++) {
        cards.flipCard(i);
      }      
    }

    flipAll();
    $timeout(function() {
      cards.setFlippableAll(true);
      flipAll();
    }.bind(cards), 5000)
  }]);