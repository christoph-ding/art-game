angular.module('gamePlayer', [])
.service('deckOfCards', function(imageFetcher) {

  var deck = [];

  this.getDeck = function(size) {
    if (!deck.length) {
      var images = imageFetcher.fetchImages()
      // call generate deck
      generateDeck(images, size)
      shuffle(deck);  
    }
    return deck;
  }

  function generateDeck(images, size) {
    // only make the deck if there are enough images for the size requested
    if (canMakeDeck(images, size)) {
      randomImages = pickRandomSubset(images, size / 2);
      attachImagesToCards(randomImages);
    }
  }

  function canMakeDeck(images, size) {
    var pairsRequired = size / 2;
    // returns bool
    return images.length > pairsRequired;
  }

  function pickRandomSubset(images, subsetSize) {
    shuffle(images);
    var imageSubset = images.slice(0, subsetSize);
    return imageSubset;
  }

  function attachImagesToCards(imageSubset) {
    // returns a deck of pairs of cards
    imageSubset.forEach(function(image) {
      firstCard = new card(image);
      secondCard = new card(image);
      deck.push(firstCard);
      deck.push(secondCard);
    })
  }

  function shuffle(a) {
    // shuffles the main deck
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  }

  var card = function(imageUrl) {
    this.revealed = false;
    this.URL = imageUrl;

    // determines what happens when the card is clicked
    this.flip = function() {
      if (!this.revealed) {
          this.revealed = true;
      }
    }
    this.getStyle = function() {
      if (this.revealed) {
        return 'background-image: url(' + '"' + this.URL + '"' + ') '
      }
    }
  }

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

        // get the result of the round

        if (cardsMatch) {
          this.resolveMatch(this.cardAlreadyRevealed, flippedCard);
        } else {
          // let the user look at both cards before, unrevealing them
          this.playerCanControl = false;
          this.resolveMiss(this.cardAlreadyRevealed, flippedCard);
        }
        // reset the round after a brief time where user looks at both cards
        this.resetRound();

        // return the result of the round
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

.service('gameHandler', function() {

  // generate a game handler


  // Game Handler, which has
    // score
    // triesLeft


  // calculate result
    

  // win action


  // lose action

})
