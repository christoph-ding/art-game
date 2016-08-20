angular.module('game', [])
.controller('gameController', function(gamestarter, cardTracker, imageFetcher) {
  var game = this;

  game.deck = gamestarter.generateDeck(18);
  game.board = gamestarter.generateBoard(3,6, game.deck);
  game.tracker = cardTracker.generateTracker();

  var imagesDir = '/assets/images/icons/';

  imageFetcher.fetchImages()
    .then(function(files) {
      game.map = imageFetcher.generateMap(files.data, game.deck.length / 2);
    })
    .then(function() {
      imageFetcher.attachImagesToCards(game.deck, game.map, imagesDir);
    })
    
  game.flipCard = function(card) {
    // we will not flip cards if the game is 'processing' result
    // we will not allow players to flip the same card
    if (game.tracker.playerCanControl && card != game.tracker.currentlyShowing) {
      card.flip();
      game.tracker.calculateScore(card);
    }
  }

})
