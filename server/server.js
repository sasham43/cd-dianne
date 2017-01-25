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
var buttonPrev = new gpio(27, 'in', 'both');
var buttonNext = new gpio(18, 'in', 'both');
var buttonEject = new gpio(23, 'in', 'both');

buttonPlay.watch(function(err, value) {
  console.log('button play press:', value, err);
  if(value === 1){
    controls.play();
  }
});

buttonPrev.watch(function(err, value) {
  console.log('button prev press:', value, err);
  if(value === 1){
    controls.prevTrack();
  }
});

buttonNext.watch(function(err, value) {
  console.log('button next press:', value, err);
  if(value === 1){
    controls.nextTrack();
  }
});

buttonEject.watch(function(err, value) {
  console.log('button eject press:', value, err);
  if(value === 1){
    controls.eject();
  }
});

io.on('connection', function(socket){
  socket.on('play', controls.play);

  socket.on('eject', controls.eject);

  socket.on('prev', controls.prevTrack);

  socket.on('next', controls.nextTrack);

  socket.on('get status', function(){
    console.log('get status:', controls.status);
    socket.emit('status', controls.status);
  });

  console.log('socket connected.');
  socket.emit('socket connected');

  socket.on('disconnect', function(){
    console.log('disconnected, attempting to reconnect.');
    // socket.reconnect();
  });
});

server.listen(port);
