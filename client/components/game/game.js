angular.module('game', [])
.controller('gameController', function(deckOfCards, roundHandler, imageFetcher) {

  var game = this;

  // get a deck of cards
  // get a board using that deck
  // get a roundHandler
    
  game.flipCard = function(card) {
    // we will not flip cards if the game is 'processing' result
    // we will not allow players to flip the same card
    if (game.roundHandler.playerCanControl && card != game.roundHandler.currentlyShowing) {
      card.flip();
      game.roundHandler.processPlayerChoice(card);
    }
  }

})
