angular.module('cover', [])
.controller('coverController', function(imageFetcher, modal) {

  var cover = this;

  cover.images = imageFetcher.fetchImages();
  cover.modal = modal.generateModal();

  cover.imageOne = cover.images[0];
  cover.imageTwo = cover.images[1];
  cover.imageThree = cover.images[2];
  // find a way to update the cover image on a timer
  

})
