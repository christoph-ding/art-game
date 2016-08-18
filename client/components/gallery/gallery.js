angular.module('gallery', [])
.controller('galleryController', function(imageFetcher) {
  var gallery = this;
  var imagesDir = '/assets/images/hiroshige/';
  gallery.collection = null;


  gallery.focusModal = { msg: 'hello' };





  imageFetcher.fetchImages()
    .then(function(files) {
      console.log(files);
      gallery.collection = imageFetcher.generateCollectionOfImages(files.data, imagesDir);
  })
})
