angular.module('game', [])
.controller('gameController', function(getDeck, roundHandler, imageFetcher) {

  var game = this;

  // get the images the app is using
  game.images;

  imageFetcher.fetchImages()
    .then(function(files) {

       game.images = files;
    })

























  // game.deck = getDeck.generateDeck(18);
  // game.board = getDeck.generateBoard(3,6, game.deck);
  // game.roundHandler = roundHandler.generateRoundHandler();

  // imageFetcher.fetchImages()
  //   .then(function(files) {





  //     game.map = imageFetcher.generateMap(files, game.deck.length / 2);
  //     console.log(files.data)
  //   })
  //   .then(function() {
  //     imageFetcher.attachImagesToCards(game.deck, game.map, imagesDir);
  //   })
    
  game.flipCard = function(card) {
    // we will not flip cards if the game is 'processing' result
    // we will not allow players to flip the same card
    if (game.roundHandler.playerCanControl && card != game.roundHandler.currentlyShowing) {
      card.flip();
      game.roundHandler.processPlayerChoice(card);
    }
  }

})
