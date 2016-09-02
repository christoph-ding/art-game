angular.module('cover', [])
.controller('coverController', function(imageFetcher, modal) {

  var cover = this;

  cover.setCoverImages = function() {
    imageFetcher.shuffle(cover.images);
    cover.imageOne = cover.images[0];
    cover.imageTwo = cover.images[1];
    cover.imageThree = cover.images[2];
    $scope.$apply();
  }

  cover.images = imageFetcher.fetchImages();
  cover.modal = modal.generateModal();
  cover.setCoverImages();

  setInterval(cover.setCoverImages, 4000);
})
