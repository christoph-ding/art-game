var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// Variables for pathing
var extensions = {
  '.html': 'text/html',
  '.css': 'text/css'
};

var directories = {
  client: '/../client/',
  bower_components: '/../client/bower_components/'
}

var files = {
    '/': directories.client + 'index.html',
    '/style.css': directories.client + 'style.css',
    '/bower_components/angular/angular.js': directories.bower_components + 'angular/angular.js'
};

var server = http.createServer(function(req, res) {
  // routing
  var reqPath = url.parse(req.url).pathname;
  var filePath = path.join(__dirname + files[reqPath]);
  console.log('request for path: ' + reqPath + '   file: ' + filePath);

  fs.exists(filePath, function(exists) {
    ext = path.extname(filePath);
    if (exists) {
      fs.readFile(filePath, function(err, data){
        if (err) console.log(err)
        else {
          res.writeHead(200, {'Content-type': extensions[ext]});
          res.end(data);
        }
      })
    } else {
    res.writeHead(404);
    res.end('wtf, could not find: ' + filePath);
    }
  })
})

server.listen(8000);
