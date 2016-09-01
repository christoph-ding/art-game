angular.module('game', [])
.controller('gameController', function(deckOfCards, roundHandler, imageFetcher, gameHandler) {

  var game = this;

  // generate the deck, board and roundHandler neccesary to play game
  var deckSize = 18;
  var pairs = deckSize / 2;
  var tries = 10;

  game.deck = deckOfCards.getDeck(deckSize);
  game.board = deckOfCards.generateBoard(3, 6, game.deck);

  game.currentGame = gameHandler.generateGameHandler(pairs, tries);
  game.roundHandler = roundHandler.generateRoundHandler(game.currentGame);

  game.flipCard = function(card) {
    // we will not flip cards if the game is 'processing' result
    // we will not allow players to flip the same card
    if (card !== game.roundHandler.cardAlreadyRevealed && game.roundHandler.playerCanControl && card != game.roundHandler.currentlyShowing) {
      card.flip();
      // handle the round, collect the result
      console.log('processing');
      game.roundHandler.processPlayerChoice(card);
      // 
    }
  }

})
