angular.module('gallery', [])
.controller('galleryController', function(imageFetcher, modal, $http) {
  var gallery = this;

  gallery.images = imageFetcher.fetchImages();
  gallery.modal = modal.generateModal();

  gallery.imageSet;

  gallery.changeImageSet = function() {
    $http.get('/images', { params: { imageSetName: gallery.imageSet } })
    .then(function(files) {
      gallery.images = files.data;
      console.log(gallery.images);
    })
  }
})
