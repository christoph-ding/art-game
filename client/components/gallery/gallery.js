angular.module('gallery', [])
.controller('galleryController', function(imageFetcher) {
  var gallery = this;
  var imagesDir = '/assets/images/hiroshige/';
  gallery.collection = null;

  imageFetcher.fetchImages()
    .then(function(files) {
      console.log(files);
      gallery.collection = files.data;
  })
})
