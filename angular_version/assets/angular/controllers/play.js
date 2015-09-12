angular.module('play', ['cards'])
  .controller('play', ['cards', '$timeout', '$interval', '$scope', '$rootScope', '$http', function(cards, $timeout, $interval, $scope, $rootScope, $http){

    var self = this;
    var counter = 0;
    var turns = 1;
    var lastCount, reveal, countDown, elapsedTime;

    self.endScreen = true;

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
      endGame();
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

    // used to find current worst score, to see if there is a new
    // hi score. As in golf, a high number of turns is a worse score.
    // If more than one score has the same number of turns, elapsed
    // play time is the tie breaker.
    var findWorst = function(data) {
      var mostTurns = 0;
      var candidates = [];
      for (var i = 0; i < data.length; i++) {
        if (data.turns > mostTurns) {
          mostTurns = data[i].turns;
          candidates = [data[i]];
        } else if (data[i].turns === mostTurns){
          candidates.push(data[i]);
        }
      }
      // if more than one score with same # of turns, look at elapsed time.
      if (candidates.length > 1) {
        var leastTime, index = 0;
        for (var i = 0; i < candidates.length; i++) {
          if (!leastTime || candidates[i].elapsedTime < leastTime) {
            leastTime = candidates[i].elapsedTime;
            index = i;
          }
        }
        return candidates[index];

      } else {
        return candidates[0];
      }
    }

    var endGame = function() {

      self.newHiScore = false;
      self.elapsedTime = new Date() - elapsedTime;
      self.turns = turns;

      // gets old scores to check for new hiscore.
      $http.get('api/hiscores')
        .then(function(response){

          var currentWorst = findWorst(response.data);

          if (response.data.length < 20 ||
            turns < currentWorst.turns ||
            (turns === currentWorst.turns && elapsedTime < leastTime)) {
            self.newHiScore = true;
          }
        })

      gameFinished = $timeout(function() {
        self.endScreen = false;        
      }, 2000)

    }

    var initialize = function(){
      self.startCount = 3;
      elapsedTime = new Date();
      countDown = $interval(function(){
        if (self.startCount === 1) {
          self.startScreen = true;
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