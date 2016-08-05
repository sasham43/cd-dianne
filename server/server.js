var express = require('express');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3001;

app.use(express.static('server/public'));

server.listen(port);

app.get('/', function(res, req){
  res.sendFile('./public/index.html');
});
