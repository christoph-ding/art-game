angular.module('cover', [])
.controller('coverController', function(imageFetcher) {

    var cover = this;

    // find a way to update the cover image on a timer    
    imageFetcher.fetchImages()

    // clicking on the image makes a larger, modal version of it
})
