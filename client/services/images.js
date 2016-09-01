angular.module('curator', [])
.service('imageFetcher', function($http) {

  // fetch a single set of images for the entire app
  var images;

  this.shuffle = function(a) {
    // shuffles an array
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
  }

  this.fetchImages = function() {
    if (!images) {
      $http.get('/images')
      .then(function(files) {
        images = generateCollectionOfImages(files.data);
        this.shuffle(images);
      }.bind(this))
    }
    return images;
  }

  function generateCollectionOfImages(images) {
    var collection = [];
    images.forEach(function(filePath){
      var title = filePath.split('/').pop()
      collection.push(new image(title, filePath));
    })
    return collection;
  }

  function image(title, imageURL) {
    this.title = title;
    this.URL = imageURL;
  }


})

.service('modal', function() {

  var imageModal;

  this.generateModal = function() {
    if (!imageModal) {
      imageModal = new modal();
    }
    return imageModal;
  }

  this.updateModal = function(imageURL) {
    imageModal.imageURL = imageURL;
  }

  var modal = function() {
    this.imageURL = '',
    this.class = 'hidden',
    this.hide = function() {
      this.class = 'hidden'
    }
    this.focus = function(imageURL) {
      this.imageURL = imageURL;
      this.class = 'modal';
    }
  }
})
