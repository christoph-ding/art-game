angular.module('cover', [])
.controller('coverController', function(imageFetcher) {

    var cover = this;

    cover.images;
    cover.imagesDir = '/assets/images/hiroshige/';
    cover.counter = 0;

    imageFetcher.fetchImages()
    // find a way to update the cover image on a timer
})
