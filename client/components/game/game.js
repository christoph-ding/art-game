angular.module('game', [])
.controller('gameController', ['gamestarter', function(gamestarter) {
  this.rows = gamestarter.generateCards();
  this.click = function () {console.log()};
}])
