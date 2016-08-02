angular.module('gallery', [])
.controller('galleryController', function(imageFetcher) {
  var gallery = this;

  gallery.images = [];

  imageFetcher.getImage()
    .then(function(response) {
      for (var i = 0; i < response.data.length; i++) {
        // let's not add the .DS Store
        if (response.data[i].charAt(0) != '.') {
          file = '/assets/images/hiroshige/' + response.data[i];
          gallery.images.push(file);
        }
      }
    })
})
