angular.module('play', ['cards'])
  .controller('play', ['cards', '$timeout', '$interval', '$scope', '$rootScope', function(cards, $timeout, $interval, $scope, $rootScope){

    var self = this;
    var counter = 0;
    var turns = 1;
    var lastCount, reveal, countDown;

    self.back = cards.back;

    /* cheat for debugging: outer loop flips card--
    inner loop finds match, flips that one */
    var blazeThrough = function() {
      for (var i = 0; i < self.shuffled.length; i++) {
        if (!self.shuffled[i].flipped) {
          cards.flipCard(i);
          for (var j = i + 1; j < self.shuffled.length; j++) {
            if (self.shuffled[i].animal === self.shuffled[j].animal) {
              cards.flipCard(j);
            }
          }
        }
      }
    }

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

    var initialize = function(){
      self.startCount = 3;
      countDown = $interval(function(){
        if (self.startCount === 1) {
          hideWhiteScreen();
          $interval.cancel(countDown);
          countDown = undefined;
          blazeThrough();
        }
        self.startCount--;
      }.bind(cards), 1000)     
    }

    initialize();

    var revealAllCards = function(){    
      flipAll();
      reveal = $timeout(function() {
        cards.setFlippableAll(true);
        flipAll();
      }.bind(cards), 5000);
    }


    $scope.$on('$destroy', function(){
      if (angular.isDefined(reveal)) {
        $timeout.cancel(reveal);
        reveal = undefined;
      }
      if (angular.isDefined(countDown)) {
        $interval.cancel(countDown);
        countDown = undefined;
      }
    })
  }]);