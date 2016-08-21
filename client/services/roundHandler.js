angular.module('roundHandler', [])
.service('roundHandler', function() {
  this.generateRoundHandler = function () {
    var roundHandler;

    if (!roundHandler) {
      roundHandler = new this.roundHandler();
    } 
    return roundHandler;
  }

  var roundHandler = function () {
    this.score = 0;
    this.triesLeft = 10;
    this.cardAlreadyRevealed = false;
    this.playerCanControl = true;

    this.processPlayerChoice = function(flippedCard) {
      // we take control of the board from player for a little bit
      this.playerCanControl = false;

      // when there are no cards revealed
      if (!this.cardAlreadyRevealed) {
        this.cardAlreadyRevealed = flippedCard;
      } else { // there is already a revealed card
        
        // compare cards
        var cardsMatch = this.compareCards(cardOne, cardTwo);
        if (cardsMatch) {
          this.resolveMatch(cardOne, cardTwo);
        } else {
          this.resolveMiss(cardOne, cardTwo);
        }

        // reset the round after a brief time where user looks at both cards
        $timeout(this.resetRound(this), 1600);
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
      this.triesLeft = 10;
      this.turnFacedown(cardOne, cardTwo);  
    }

    this.turnFacedown = function(cardOne, cardTwo) {
      cardOne.revealed = false;
      cardTwo.revealed = false; 
    }

    this.resetRound = function(tracker) {
      tracker.cardAlreadyRevealed = false;
      tracker.playerCanControl = true;
    }
}) 
