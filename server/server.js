// dependencies
var express = require('express');
var path = require('path');

// server and connection
var app = express();
var port = 8000;
app.listen(port);

console.log('heyo!');

// routing
app.use(express.static(path.join(__dirname + '/../client')));
