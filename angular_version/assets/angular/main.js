angular.module('app', ['ngRoute', 'play', 'hiscores', 'templates'])
  
  .constant('baseHref', '/memory')

  .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
    $routeProvider
    .when('/memory/play',
      {
        templateUrl: 'play.html',
      }
    )
    .when('/memory/hiscores',
      {
        templateUrl: 'hiscores.html',     
      }
    ).otherwise({
      redirectTo: '/memory/hiscores'
    });

    $locationProvider.html5Mode(true);

  }])