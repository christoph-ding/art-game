var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// Variables for pathing
var extensions = {
  '.html': "text/html",
  '.css': "text/css",
  '.js': "text/js"
};

var directories = {
  client: '/../client/',
  bower_components: '/../client/bower_components/',
  pages: '/../client/pages/'
}

var files = {
    '/': directories.client + 'index.html',
    '/style.css': directories.client + 'style.css',
    '/bower_components/angular/angular.js': directories.bower_components + 'angular/angular.js',
    '/bower_components/angular-ui-router/release/angular-ui-router.js': directories.bower_components + 'angular-ui-router/release/angular-ui-router.js',
    '/app.js': directories.client + 'app.js',
    // Partials
    '/home.html': directories.pages + 'home.html'

};

var server = http.createServer(function(req, res) {
  // routing
  var reqPath = url.parse(req.url).pathname;
  var filePath = path.join(__dirname + files[reqPath]);
  console.log('requested file: ' + filePath);

  fs.exists(filePath, function(exists) {
    ext = path.extname(filePath);
    if (exists) {
      // why do I need this fucking exception for .css files?
      if (ext === '.css') {
        fs.readFile(filePath, function(err, data){
          if (err) console.log(err)
          else {
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
          }
        })
      } else {
        fs.readFile(filePath, function(err, data){
          if (err) console.log(err)
          else {
            res.writeHead(200, {'Content-Type': extensions[ext]});
            res.write(data);
            res.end();
          }
        })
      }
    } else {
    res.writeHead(404);
    res.end('wtf, could not find: ' + filePath);
    }
  })
})

server.listen(8000);
