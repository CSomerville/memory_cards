angular.module('app', ['ngRoute', 'play', 'hiscores', 'templates'])
  
  .constant('baseHref', '/memory')

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
    .when('/memory', 
      {
        template: '<h1>errrm</h1>'
      }
    )
    .when('/memory/play',
      {
        templateUrl: 'play.html',
        controller: 'play',
        controllerAs: 'play'
      }
    )
    .when('/memory/hiscores',
      {
        templateUrl: 'hiscores.html',
        controller: 'hiscores',
        controllerAs: 'hiscores'      
      }
    );

    $locationProvider.html5Mode(true);

  }])