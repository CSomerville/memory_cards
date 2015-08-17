angular.module('hiscores', ['cards'])
  .controller('hiscores', ['cards', '$interval', '$scope', function(cards, $interval, $scope){
    var self = this;
    var counter = 0;
    var lastCount;
    var play;

    $scope.$on('$destroy', function(){
      if (angular.isDefined(play)) {
        $interval.cancel(play);
        play = undefined;
      }
    })

    self.back = cards.back;
    var aDeck = cards.makeDeck();
    self.shuffled = cards.shuffleDeck(aDeck);

    var getIdsOfUnflipped = function(deck){
      return self.shuffled.filter(function(el){
        if (!el.flipped) return el;
      }).map(function(el){
        return el.id;
      })
    };

    var simulatedPlay = function() {
      var play = $interval(function(){
        var unflipped = getIdsOfUnflipped(self.shuffled);
        if (unflipped.length) {          
          var chosen = unflipped[Math.floor(Math.random() * unflipped.length)];

          var i = cards.getCardIndexById(chosen);

          if (cards.flipCard(i)) counter ++;

          if (counter % 2 === 0 && counter !== 0 && counter !== lastCount) {
            cards.checkForMatch(i);
            lastCount = counter;
          };
        }

      }, 2000)
    }

    simulatedPlay();


  }])