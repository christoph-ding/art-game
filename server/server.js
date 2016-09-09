// dependencies
var express = require('express');
var path = require('path');
var fs = require('fs');

// server and connection
var app = express();
var port = 8000;
app.listen(port);

// routing
app.use(express.static(path.join(__dirname + '/../client')));

// this is the callback version
var fetchImages = function(imageSetName, callback) {

  var imagesDirFromIndex = '/../assets/images/' + imageSetName;
  var imagesDirFromServer = '/../client/assets/images/' + imageSetName; 
  var fullPathToImages = path.join(__dirname + imagesDirFromServer);

  fs.exists(fullPathToImages, function(exists) {
    if (exists) {
      fs.readdir(fullPathToImages, function(err, files) {
        if (err) { return console.log(err); }
        // filter files so we do not send hidden . files, such as .DS_Store
        images = files.filter(function(file) {
          return file.charAt(0) !== '.';
        });
        // set each image name to the full path to that image
        images.forEach(function(image, index, images) {
          // images[index] = path.join(fullPathToImages + image);
          images[index] = path.join(imagesDirFromIndex + image);
        });
        callback(images);
      });
    } else {
      console.log('does not exist!');
    }
  });
}

// this is the promise version

// change a imageset
app.get('/images', function(req, res) {
  var imageSetName;
  if (req.query.imageSetName) {
    imageSetName = req.query.imageSetName;
  } else {
    imageSetName = 'hiroshige';
  }

  var imageSetPath = imageSetName + '/';

  fetchImages(imageSetPath, function(data) {
    res.send(data);
  });
});
