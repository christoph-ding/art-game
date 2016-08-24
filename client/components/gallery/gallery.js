angular.module('gallery', [])
.controller('galleryController', function(imageFetcher, $window) {
  var gallery = this;
  var imagesDir = '/assets/images/icons/';
  gallery.collection = null;

  gallery.focusModal = { 
    msg: 'hello', 
    url: '',
    modelClass: 'hidden',
    hide: function() {
      this.modelClass = 'hidden';
    }
  };

  gallery.changeFocus = function(image) {
    gallery.focusModal.url = image.URL;
    gallery.focusModal.modelClass = 'modal';
  };

  imageFetcher.fetchImages()
    .then(function(files) {
      gallery.collection = imageFetcher.generateCollectionOfImages(files.data, imagesDir);
  });
})
