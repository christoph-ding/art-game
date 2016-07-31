angular.module('gamePlayer', [])
.service('gamestarter', function() {

  this.generateBoard = function(gridHeight, gridWidth) {
    // for now, we generate a set number of rows and columns
    // later, we will have those be inputs
    var board = [];
    for (row = 1; row < gridHeight + 1; row++) {
      var currentRow = [];
      for (column = 1; column < gridWidth + 1; column++) {
        id = (row - 1) * gridWidth + column;
        currentRow.push(new card(id));
      }
      board.push(currentRow);
    }
    return board;
  }

  function card(id) {
    this.id = id;
    this.faceShowing = false;
    this.flip = function() {
      if (!this.faceShowing) {
          this.faceShowing = true;
      }
    }
  }
})

.service('cardTracker', function($timeout) {

  this.generateTracker = function() {
    function tracker() {
      this.score = 0;
      this.playerCanControl = true;
      // is there already a card that has been flipped?
      this.currentlyShowing = false;

      this.doSomething = function(card) {
        // when there are no cards showing, we simply have a showing card
        if (!this.currentlyShowing) {
          this.currentlyShowing = card;
        } else {
        // if there is a currently showing card, we compare against that card
          // a match
          if (this.currentlyShowing.id > card.id) {
            // change score
            this.score++;
          }
          // not a match
          // turn both cards downwards regardless
          this.playerCanControl = false;
          var tracker = this;
          // we will take control away from player while she is looking at the cards
          $timeout(function() {
            tracker.currentlyShowing.faceShowing = false;
            tracker.currentlyShowing = false;
            card.faceShowing = false;
            tracker.playerCanControl = true;
          }, 1600);
        }
      }
    }
    return new tracker();
  }
})
