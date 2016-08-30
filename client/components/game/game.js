angular.module('game', [])
.controller('gameController', function(deckOfCards, roundHandler, imageFetcher) {

  var game = this;

  // generate the deck, board and roundHandler neccesary to play game
  game.deck = deckOfCards.getDeck(20);
  game.board = deckOfCards.generateBoard(4, 5, game.deck);
  // get a roundHandler
  game.roundHandler = roundHandler.generateRoundHandler();

  game.flipCard = function(card) {
    // we will not flip cards if the game is 'processing' result
    // we will not allow players to flip the same card
    if (game.roundHandler.playerCanControl && card != game.roundHandler.currentlyShowing) {
      card.flip();
      game.roundHandler.processPlayerChoice(card);
    }
  }

})
