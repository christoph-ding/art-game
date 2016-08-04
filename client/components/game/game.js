angular.module('game', [])
.controller('gameController', function(gamestarter, cardTracker, imageFetcher) {
  var game = this;

  game.deck = gamestarter.generateDeck(20);
  game.board = gamestarter.generateBoard(4,5, game.deck);
  game.tracker = cardTracker.generateTracker();

  var imagesDir = '/assets/images/hiroshige/';

  game.flipCard = function(card) {
    // we will not flip cards if the game is 'processing' result
    // we will not allow players to flip the same card
    if (game.tracker.playerCanControl && card != game.tracker.currentlyShowing) {
      card.flip();
      game.tracker.doSomething(card);
    }
  }

  imageFetcher.fetchImages()
    .then(function(files) {
      game.map = imageFetcher.generateMap(files.data, game.deck.length / 2);
    })
    .then(function() {
      imageFetcher.attachImagesToCards(game.deck, game.map, imagesDir);
    })
})
