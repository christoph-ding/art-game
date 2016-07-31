angular.module('game', [])
.controller('gameController', ['gamestarter', 'cardTracker', function(gamestarter, cardTracker) {
  this.board = gamestarter.generateBoard(3,5);
  this.tracker = cardTracker.generateTracker();

  this.flipCard = function(card) {
    card.flip();
    this.tracker.doSomething(card);

  }

}])
