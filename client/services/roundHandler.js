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

      // when there are no cards revealed, keep a card revealed
      if (!this.cardAlreadyRevealed) {
        this.cardAlreadyRevealed = flippedCard;
      } else {
        // compare both flipped cards
        var cardsMatch = this.compareCards(cardOne, cardTwo);
        if (cardsMatch) {
          this.resolveMatch(cardOne, cardTwo);
        } else {
        // reset the round after a brief time where user looks at both cards
          this.resolveMiss(cardOne, cardTwo);
        }
      }
    }

    this.resolveMatch = function(cardOne, cardTwo) {
      this.score++;
      this.keepRevealed(cardOne, cardTwo);
    }

    this.resolveMiss = function(cardOne, cardTwo) {
      this.triesLeft = 10;
      this.turnFacedown(cardOne, cardTwo);  
    }

    this.compareCards = function(cardOne, cardTwo) {
      return cardOne.URL === cardTwo.URL;
    } 

    this.keepRevealed = function(cardOne, cardTwo) {
      // a match should keep both cards revealed until end of game
      cardOne.revealed = true;
      cardTwo.revealed = true;
    }

    this.turnFacedown = function(cardOne, cardTwo) {
      cardOne.revealed = false;
      cardTwo.revealed = false; 
    }

    this.resetRound = function(cardOne, cardTwo, tracker) {
      tracker.currentlyShowing.
    }
}) 
