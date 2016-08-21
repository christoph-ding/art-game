angular.module('gamePlayer', [])
.service('gamestarter', function() {
  this.generateBoard = function(gridHeight, gridWidth, deck) {
    // for now, we generate a set number of rows and columns
    // later, we will have those be inputs
    var board = [];
    for (row = 0; row < gridHeight; row++) {
      var currentRow = [];
      for (column = 0; column < gridWidth; column++) {
        id = (row * gridWidth) + column;
        currentRow.push(deck[id]);
      }
      board.push(currentRow);
    }
    return board;
  }

  this.generateDeck = function(cards) {
    var deck = [];
    for (var i=1; i<= cards; i++) {
      deck.push(new this.card(i))
    }
    return deck;    
  }

  this.card = function(id) {
    this.id = id;
    this.revealed = false;
    this.URL = null;
    this.flip = function() {
      if (!this.revealed) {
          this.revealed = true;
      }
    }
    this.getStyle = function() {
      if (this.revealed == false) {
        return 'background-color: blue';
      } else {
        return 'background-image: url(' + '"' + this.URL + '"' + ') '
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

      this.calculateScore = function(card) {
        // when there are no cards showing, we simply have a showing card
        if (!this.currentlyShowing) {
          this.currentlyShowing = card;
        } else {
        // if there is a currently showing card, we compare against that card
          // a match
          if (this.currentlyShowing.URL == card.URL) {
            // change score
            this.score++;
            // a match should keep up both cards forever...
            this.currentlyShowing.revealed = true;
            card.revealed = true;
            this.currentlyShowing = false;
          } else {
            // not a match
            // turn both cards downwards regardless
            this.playerCanControl = false;
            var tracker = this;
            // we will take control away from player while she is looking at the cards
            $timeout(function() {
              tracker.currentlyShowing.revealed = false;
              tracker.currentlyShowing = false;
              card.revealed = false;
              tracker.playerCanControl = true;
            }, 1600);
          }
        }
      }

      // this.handleRound = function() {
      //   // check if there is already a card showing
      //   if (!this.currentlyShowing) {
      //     this.currentlyShowing = card;
      //   } else {
      //   // otherwise, compare current card to just flipped card
      //   if 
      //       // if cards Match:
      //         // keepCardsUp
      //         // resetRound...a different way

      //       // otherwise:
      //         // reset anyways




      //   }
      // }

      this.cardsMatch = function(cardOne, cardTwo) {
      } 

      this.keepCardsUp = function(cardOne, cardTwo) {
      }

      this.resetRound = function() {
      }

    }
    return new tracker();
  }
})
