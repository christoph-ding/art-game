angular.module('gallery', [])
.controller('galleryController', function(imageFetcher) {
  var gallery = this;
  var imageDir = '/assets/images/hiroshige'
  gallery.deck = [ { 'id': 1 }, { 'id': 2 }, { 'id': 3 },
               { 'id': 4 }, { 'id': 5 }, { 'id': 6 },
               { 'id': 7 }, { 'id': 8 }, { 'id': 9 },
               { 'id': 10 }, { 'id': 11 }, { 'id': 12 }
             ]

  imageFetcher.fetchImages()
    .then(function(files) {
      gallery.map = imageFetcher.generateMap(files.data, gallery.deck.length / 2);
    })
    .then(function() {
      imageFetcher.attachImagesToCards(gallery.deck, gallery.map);
      console.log(gallery.deck);
    })


})
