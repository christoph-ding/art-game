angular.module('cover', [])
.controller('coverController', function(imageFetcher) {
    var cover = this;
    cover.images;
    
    imageFetcher.fetchImages()
      .then(function(files) {
        cover.images = files;
        console.log('the images are: ', files);
      })
})
