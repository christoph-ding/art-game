var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

var server = http.createServer(function(req, res) {
  // routing
  var reqInfo = url.parse(req.url)
  var pathname = reqInfo.pathname;
  console.log('request starting for path:  ' + pathname);

  // static files
  if (pathname === '/') {
    fs.readFile(__dirname + '/../client/index.html', function(err, data) {
      if (err) {
        console.log(err);
      };
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end(data);
    })
  }

  else if (pathname === '/style.css') {
    fs.readFile(__dirname + '/../client/style.css', function(err, data) {
      console.log('hello: ' + __dirname);
      res.end(data);
    });
  }

  else {
    res.writeHead(404);
    res.end('wtf, could not find: ' + pathname);
  }
})

server.listen(8000);
