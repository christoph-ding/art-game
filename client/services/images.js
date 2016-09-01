angular.module('curator', [])
.service('imageFetcher', function($http) {

  // fetch a single set of images for the entire app
  var images;

  this.fetchImages = function() {
    if (!images) {
      $http.get('/images')
      .then(function(files) {
        images = generateCollectionOfImages(files.data);
      })
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

.server('modal', function() {

  var imageModal;

  this.generateModal = function(imageURL) {
    if (!imageModal) {
      imageModal = new modal(imageURL);
    }
    return imageModal;
  }

  this.updateModal = function(imageURL) {
    imageModal.imageURL = imageURL;
  }

  var modal = function() {
    imageURL: '',
    modelClass: 'hidden',
    hide: function() {
      this.modelClass = 'hidden'
    }
  }
})
