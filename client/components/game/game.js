angular.module('game', [])
.controller('gameController', function(getDeck, roundHandler, imageFetcher) {
  var game = this;

  game.deck = getDeck.generateDeck(18);
  game.board = getDeck.generateBoard(3,6, game.deck);
  game.roundHandler = roundHandler.generateRoundHandler();

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
    if (game.roundHandler.playerCanControl && card != game.roundHandler.currentlyShowing) {
      card.flip();
      game.roundHandler.processPlayerChoice(card);
    }
  }

})
