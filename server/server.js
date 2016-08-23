// dependencies
var express = require('express');
var path = require('path');
var fs = require('fs');

// server and connection
var app = express();
var port = 8000;
app.listen(port);
console.log('heyo!');

// routing
app.use(express.static(path.join(__dirname + '/../client')));

// get images
app.get('/images', function(req, res) {
  // we read the image names, then send that back
  fs.readdir(path.join(__dirname + '/../client/assets/images/icons'), function(err, files) {
    if (err) { console.log(err); }
    // filter files so we do not send hidden . files, such as .DS_Store
    filteredFiles = files.filter(function(file) {
      return file.charAt(0) !== '.';
    })
    res.send(filteredFiles);
  });
});

// post images
app.post('/upload-images', function(req, res) {
  console.log('upload-images');
  res.send('upload-images');
});

// sign-in
app.post('/sign-in', function(req, res) {
  res.send('sign-in');
});

app.get('/sign-in', function(req, res) {
  console.log('sign-in');
  res.send('sign-in');
});

// sign-up
app.post('/sign-up', function(req, res) {
  console.log('sign-up');
  res.send('sign-up');
});
