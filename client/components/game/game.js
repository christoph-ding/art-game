angular.module('game', [])
.controller('gameController', function(gamestarter, cardTracker) {
  this.board = gamestarter.generateBoard(3,5);
  this.tracker = cardTracker.generateTracker();

  this.flipCard = function(card) {
    // we will not flip cards if the game is 'processing' result
    // we will not allow players to flip the same card
    if (this.tracker.playerCanControl && card != this.tracker.currentlyShowing) {
      card.flip();
      this.tracker.doSomething(card);
    }
  }

})
