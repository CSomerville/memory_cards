angular.module("templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("hiscores.html","<div class=\"full-height\" ng-controller=\"hiscores as hiscores\">\n  <div class=\"all-cards\">\n    <div ng-repeat=\"card in hiscores.shuffled track by card.id\" class=\"holds-card\">\n      <img class=\"card\" ng-click=\'hiscores.cardClicked(card.id)\' ng-src=\'/static/images/{{ card.flipped ? card.animal : hiscores.back }}\'>\n    </div>\n  </div>\n  <div class=\"white-screen\"></div>\n  <div class=\"facade full-height\">\n    <div class=\"holds-title\">\n      <a href=\'/memory/hiscores\'>Play</a>\n    </div>\n  </div>\n</div>");
$templateCache.put("play.html","<div ng-controller=\"play as play\">\n  <h1>Play</h1>\n</div>");}]);