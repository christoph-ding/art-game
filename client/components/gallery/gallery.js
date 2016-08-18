angular.module('gallery', [])
.controller('galleryController', function(imageFetcher) {
  var gallery = this;
  var imagesDir = '/assets/images/hiroshige/';
  gallery.collection = null;


  gallery.focusModal = { 
    msg: 'hello', 
    url: 'http://image.flaticon.com/teams/1-freepik.jpg',
    class: 'hidden'
  };

  gallery.changeFocus = function(image) {
    console.log(image.URL);
    gallery.focusModal.url = image.URL;
    gallery.focusModal.class = 'modal'
  };

  imageFetcher.fetchImages()
    .then(function(files) {
      console.log(files);
      gallery.collection = imageFetcher.generateCollectionOfImages(files.data, imagesDir);
  });
})
