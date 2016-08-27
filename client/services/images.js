angular.module('curator', [])
.service('imageFetcher', function($http) {

  this.images = undefined;

  this.fetchImages = function() {
    if (! this.images) {
      console.log('fetching images');
      this.images = $http.get('/images');
    }
    return this.images;
  }
  
  this.generateMap = function(files, pairs) {
    var map = {};
    var pairCounter = 1;
    while (pairCounter <= pairs) {
      map[pairCounter] = files[pairCounter];
      pairCounter++;
    }
    return map;
  }
  this.attachImagesToCards = function(deck, map, imagesDir) {
    // shuffle the deck
    deck.sort(function() {
      return .5 - Math.random();
    });
    var imageKey = 1;
    for (var i=0; i < deck.length; i+=2) {
      // we assign images to cards in pairs
      // two cards for every image
      deck[i]['URL'] = imagesDir + map[imageKey];
      deck[i+1]['URL'] = imagesDir + map[imageKey];
      imageKey++;
    }
  }
  this.generateCollectionOfImages = function(images, imagesDir) {
    var collection = [];
    images.forEach(function(title){
      collection.push(new image(title, imagesDir + title));
    })
    return collection;
  }
  function image(title, imageURL) {
    this.title = title;
    this.URL = imageURL;
    this.focus = function() {
      console.log(this.URL);
    }
  }
})
