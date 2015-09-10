angular.module('play', ['cards'])
  .controller('play', ['cards', '$timeout', '$scope', function(cards, $timeout, $scope){

    var self = this;
    var counter = 0;
    var turns = 1;
    var lastCount, reveal, countDown;

    self.back = cards.back;

    self.cardClicked = function(cardId) {
      var i = cards.getCardIndexById(cardId);
      if (cards.flipCard(i)) counter ++;
      if (cards.allFlipped()) endGame();

      if (counter % 2 === 0 && counter !== 0 && counter !== lastCount) {
        if (!cards.checkForMatch(i)) turns++;
        lastCount = counter;
      }
    }

    var aDeck = cards.makeDeck();
    self.shuffled = cards.shuffleDeck(aDeck);

    var flipAll = function() {
      for (var i = 0; i < self.shuffled.length; i++) {
        cards.flipCard(i);
      }      
    }

    var showWhiteScreen = function(){
      self.whiteScreen = false;
    };

    var hideWhiteScreen = function(){
      self.whiteScreen = true;
    }

    var endGame = function() {
      console.log(turns);
    }

    showWhiteScreen();
    countDown = $timeout(function(){
      hideWhiteScreen();
      flipAll();
      reveal = $timeout(function() {
        cards.setFlippableAll(true);
        flipAll();
      }.bind(cards), 5000);
    }.bind(cards), 3000)

    $scope.$on('$destroy', function(){
      if (angular.isDefined(reveal)) {
        $timeout.cancel(reveal);
        reveal = undefined;
      }
      if (angular.isDefined(countDown)) {
        $timeout.cancel(countDown);
        countDown = undefined;
      }
    })
  }]);