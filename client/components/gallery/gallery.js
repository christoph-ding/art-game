angular.module('gallery', [])
.controller('galleryController', function(imageFetcher, modal, $http) {
  var gallery = this;

  gallery.images = imageFetcher.fetchImages();
  gallery.modal = modal.generateModal();

  gallery.imageSet;

  gallery.sendGalleryName = function () {
    console.log(gallery.imageSet);
    // var query = '/images/' + gallery.imageSet;
    // $http.get(query);'

    // $http.get('/images', { params: {}  });
  }

})
