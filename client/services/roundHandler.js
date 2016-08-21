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
    this.currentlyShowingCard = false;
    this.playerCanControl = true;

    this.processPlayerChoice = function() {
      // when there are no cards showing, we simply have a showing card
    }

    this.cardsMatch = function(cardOne, cardTwo) {
    } 

    this.keepCardsUp = function(cardOne, cardTwo) {
    }

    this.resetRound = function() {
    }
}) 
