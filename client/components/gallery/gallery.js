angular.module('gallery', [])
.controller('galleryController', function(imageFetcher, $window) {
  var gallery = this;
  var imagesDir = '/assets/images/hiroshige/';
  gallery.collection = null;


  gallery.focusModal = { 
    msg: 'hello', 
    url: 'http://image.flaticon.com/teams/1-freepik.jpg',
    modelClass: 'hidden'
  };

  
  gallery.changeFocus = function(image) {
    console.log(image.URL);
    gallery.focusModal.url = image.URL;
    gallery.focusModal.modelClass = 'modal'
    // $window.alert('hello');
  };

  imageFetcher.fetchImages()
    .then(function(files) {
      console.log(files);
      gallery.collection = imageFetcher.generateCollectionOfImages(files.data, imagesDir);
  });
})
