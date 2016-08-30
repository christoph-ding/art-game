angular.module('gallery', [])
.controller('galleryController', function(imageFetcher, $window) {
  var gallery = this;


  gallery.collection = null;

  // fetch image with skinny controller


  // make modal into a service
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

  // upload new image set

})
