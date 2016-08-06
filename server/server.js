var express = require('express');
var cp = require('child_process');
var controls = require('./modules/controls.js');

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
var buttonPrev = new gpio(15, 'in', 'both');
var buttonNext = new gpio(16, 'in', 'both');
var buttonEject = new gpio(18, 'in', 'both');

buttonPlay.watch(function(err, value) {
  console.log('button play press:', value, err);
  controls.play;
});
buttonPrev.watch(function(err, value) {
  console.log('button prev press:', value, err);
  controls.prev;
});
buttonNext.watch(function(err, value) {
  console.log('button next press:', value, err);
  controls.next;
});
buttonEject.watch(function(err, value) {
  console.log('button eject press:', value, err);
  controls.eject;
});

io.on('connection', function(socket){
  socket.on('play', controls.play);

  socket.on('eject', controls.eject);

  socket.on('prev', controls.prev);

  socket.on('next', controls.next);

  console.log('socket connected.');
  socket.emit('socket connected');
});

server.listen(port);
