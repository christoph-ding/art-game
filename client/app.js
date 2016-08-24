var routerApp = angular.module('routerApp', ['ui.router', 'cover', 'game', 'gamePlayer', 'gallery', 'curator']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/cover');

    $stateProvider

      // cover
      .state('cover', {
        url: '/cover',
        templateUrl: '/components/cover/cover.html',
        controller: 'coverController as cover'
      })
      // game
      .state('game', {
        url: '/game',
        templateUrl: '/components/game/game.html',
        controller: 'gameController as game'
      })
      // gallery
      .state('gallery', {
        url: '/gallery',
        templateUrl: '/components/gallery/gallery.html',
        controller: 'galleryController as gallery'
      })
      // about
      .state('about', {
        url: '/about',
        templateUrl: '/components/about/about.html'
      })
})

routerApp.run(function(imageFetcher) {
  console.log('starting');
  imageFetcher.fetchImages()
    .then(function(files){
      console.log(files);
    })
})
