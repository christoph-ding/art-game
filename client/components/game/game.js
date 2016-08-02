angular.module('game', [])
.controller('gameController', function(gamestarter, cardTracker) {
  var game = this;

  game.board = gamestarter.generateBoard(3,5);
  game.tracker = cardTracker.generateTracker();

  game.flipCard = function(card) {
    // we will not flip cards if the game is 'processing' result
    // we will not allow players to flip the same card
    if (game.tracker.playerCanControl && card != game.tracker.currentlyShowing) {
      card.flip();
      game.tracker.doSomething(card);
    }
  }

})
