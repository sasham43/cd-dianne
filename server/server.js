var express = require('express');
var cp = require('child_process');
// var robot = require('robotjs');
// var process = require('process');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3001;


var child;
var trackNumber = 0;

app.use(express.static('server/public'));

app.get('/', function(res, req){
  res.sendFile('./public/index.html');
});

io.on('connection', function(socket){
  socket.on('play', function(data){
    console.log('play');
    var args = [];
    var options = { cwd: undefined, env: process.env };
    // console.log('process.env.PATH:', process.env.PATH );
    if(child){
      child.stdin.write('q', errorLog);
    } else {
      child = cp.spawn('track= ' + trackNumber + ' cdplayer.sh', args, options).on('error', function( err ){ throw err });
    }
    child.stdout.on('data', function(data) {
      console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
      console.log('stdout: ' + data);
    });
    child.on('close', function(code) {
      console.log('closing code: ' + code);
      child = undefined;
    });
  });

  socket.on('eject', function(data){
    console.log('eject');
    if(child.stdin){
      child.stdin.write('q', function(){
        cp.exec('eject /dev/cdrom', errorLog);
      });
    } else {
      cp.exec('eject /dev/cdrom', cpLog);
    }
    trackNumber = 0;
  });
  socket.on('prev', function(data){
    console.log('prev');
    child.stdin.write('<', errorLog);
    trackNumber--;
  });
  socket.on('next', function(data){
    console.log('next');
    // cp.exec('>', cpLog);
    child.stdin.write('>', errorLog);
    trackNumber++;
  });

  console.log('socket connected.');
  socket.emit('socket connected');
});

server.listen(port);

function errorLog(error){
  if(error){
    console.log('error writing to child.stdin:', error);
  }
}
