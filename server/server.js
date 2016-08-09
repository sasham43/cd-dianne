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
var buttonEject = new gpio(23, 'in', 'both');

buttonPlay.watch(function(err, value) {
  console.log('button play press:', value, err);
  if(value === 0){
    controls.play();
  }
});
buttonPrev.watch(function(err, value) {
  console.log('button prev press:', value, err);
  if(value === 0){
    controls.prevTrack();
  }
});
buttonNext.watch(function(err, value) {
  console.log('button next press:', value, err);
  if(value === 0){
    controls.nextTrack();
  }
});
buttonEject.watch(function(err, value) {
  console.log('button eject press:', value, err);
  if(value === 0){
    controls.eject();
  }
});

io.on('connection', function(socket){
  socket.on('play', controls.play);

  socket.on('eject', controls.eject);

  socket.on('prev', controls.prevTrack);

  socket.on('next', controls.nextTrack);

  console.log('socket connected.');
  socket.emit('socket connected');
});

server.listen(port);
