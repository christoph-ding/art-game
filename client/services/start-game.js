angular.module('gamePlayer', [])
.service('getDeck', function() {
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
      deck.push(new card(i))
    }
    return deck;    
  }

  var card = function(id) {
    this.id = id;
    this.revealed = false;
    this.URL = null;
    this.flip = function() {
      if (!this.revealed) {
          this.revealed = true;
      }
    };
    this.getStyle = function() {
      if (this.revealed == false) {
        return 'background-color: blue';
      } else {
        return 'background-image: url(' + '"' + this.URL + '"' + ') '
      }
    }
  }
})

.service('roundHandler', function($timeout) {
  this.generateRoundHandler = function() {
    var currentRound;

    if (!currentRound) {
      currentRound = new roundHandler();
    } 
    return currentRound;
  }

  var roundHandler = function() {
    this.score = 0;
    this.triesLeft = 10;
    this.cardAlreadyRevealed = false;
    this.playerCanControl = true;

    this.processPlayerChoice = function(flippedCard) {
      // we take control of the board from player for a little bit

      // when there are no cards revealed
      if (!this.cardAlreadyRevealed) {
        this.cardAlreadyRevealed = flippedCard;
      } else { // there is already a revealed card

        // compare cards
        var cardsMatch = this.compareCards(this.cardAlreadyRevealed, flippedCard);

        if (cardsMatch) {
          this.resolveMatch(this.cardAlreadyRevealed, flippedCard);
        } else {
          // let the user look at both cards before, unrevealing them
          this.playerCanControl = false;
          this.resolveMiss(this.cardAlreadyRevealed, flippedCard);
        }
        // reset the round after a brief time where user looks at both cards
        this.resetRound();
      }
    }

    this.compareCards = function(cardOne, cardTwo) {
      return cardOne.URL === cardTwo.URL;
    }

    this.resolveMatch = function(cardOne, cardTwo) {
      this.score++;
      this.keepRevealed(cardOne, cardTwo);
    }

    this.keepRevealed = function(cardOne, cardTwo) {
      // a match should keep both cards revealed until end of game
      cardOne.revealed = true;
      cardTwo.revealed = true;
    }
    
    this.resolveMiss = function(cardOne, cardTwo) {
      this.triesLeft--;
      var roundHandler = this;
      $timeout(function () {
        roundHandler.turnFacedown(cardOne, cardTwo);
        roundHandler.playerCanControl = true;
        }, 1600);
    }

    this.turnFacedown = function(cardOne, cardTwo) {
      cardOne.revealed = false;
      cardTwo.revealed = false; 
    }

    this.resetRound = function() {
      this.cardAlreadyRevealed = false;
    }
  }
})
