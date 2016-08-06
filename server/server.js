var express = require('express');
var cp = require('child_process');
// var controls = require('./modules/controls.js');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3001;



// var child;
// var trackNumber = 0;

app.use(express.static('server/public'));

app.get('/', function(res, req){
  res.sendFile('./public/index.html');
});

var gpio = require('onoff').Gpio;
var buttonPlay = new gpio(17, 'in', 'both');

buttonPlay.watch(function(err, value) {
  console.log('button press:', value, err);
});

// io.on('connection', function(socket){
//   socket.on('play', controls.play);
//
//   socket.on('eject', controls.eject);
//
//   socket.on('prev', controls.prev);
//
//   socket.on('next', controls.next);
//
//   console.log('socket connected.');
//   socket.emit('socket connected');
// });

server.listen(port);

function errorLog(error){
  if(error){
    console.log('error writing to child.stdin:', error);
  }
}
