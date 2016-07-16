var http = require("http");
var url = require("url")

var server = http.createServer(function(req, res) {
  // routing
  var reqInfo = url.parse(req.url)
  var pathname = reqInfo.pathname
  console.log("Client:  " +  req.connection.remoteAddress + "path:  " + pathname);

  resMsg = "heya";
  // static files
  if (pathname === "/") {
    resMsg = "...serving index.html";
  }

  //
  res.writeHead(200);
  res.end(resMsg);
})

server.listen(8000);
