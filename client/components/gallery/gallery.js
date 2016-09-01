angular.module('gallery', [])
.controller('galleryController', function(imageFetcher, modal, $window) {
  var gallery = this;

  gallery.images = imageFetcher.fetchImages();
  gallery.modal = modal.generateModal();
})
