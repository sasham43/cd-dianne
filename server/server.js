var express = require('express');
var cp = require('child_process');
// var robot = require('robotjs');
// var process = require('process');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3001;


var child;

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
    child = cp.spawn('cdplayer.sh', args, options).on('error', function( err ){ throw err });
    child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
    });
    child.stderr.on('data', function(data) {
        console.log('stdout: ' + data);
    });
    child.on('close', function(code) {
        console.log('closing code: ' + code);
    });
  });

  socket.on('eject', function(data){
    console.log('eject');
    cp.exec('eject /dev/cdrom', cpLog);
  });
  socket.on('prev', function(data){
    console.log('prev');
    child.stdout.write('<', function(error){
      if(error){
        console.log('error writing to stream', error);
      }
    });
  });
  socket.on('next', function(data){
    console.log('next');
    // cp.exec('>', cpLog);
    child.stdout.write('>', function(error){
      if(error){
        console.log('error writing to stream', error);
      }
    });
  });

  console.log('socket connected.');
  socket.emit('socket connected');
});

server.listen(port);

function cpLog(error, stdout, stderr){
  if(error){
    console.error('error:', error);
    return;
  }

  console.log('stdout:', stdout);
  console.log('stderr:', stderr);
}
