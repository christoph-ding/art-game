angular.module('game', [])
.controller('gameController', ['gamestarter', 'playgame', function(gamestarter, playgame) {
  this.rows = gamestarter.generateCards();
  this.playgame = playgame.msg;
}])
