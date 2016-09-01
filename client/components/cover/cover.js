angular.module('cover', [])
.controller('coverController', function(imageFetcher) {

    var cover = this;

    cover.images = imageFetcher.fetchImages();
    // find a way to update the cover image on a timer    

    // clicking on the image makes a larger, modal version of it
})
