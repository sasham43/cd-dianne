var express = require('express');
var cp = require('child_process');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var port = 3001;

app.use(express.static('server/public'));

app.get('/', function(res, req){
  res.sendFile('./public/index.html');
});

io.on('connection', function(socket){
  socket.on('play', function(data){
    console.log('play');
    cp.exec('omxcdplayer', cpLog);
  });

  socket.on('eject', function(data){
    console.log('eject');
    cp.exec('eject /dev/cdrom', cpLog);
  });
  socket.on('prev', function(data){
    console.log('prev');
    cp.exec('<', cpLog);
  });
  socket.on('next', function(data){
    console.log('next');
    cp.exec('>', cpLog);
  });

  console.log('socket connected.');
  socket.emit('socket connected');
});

server.listen(port);

cpLog = (error, stdout, stderr) => {
  if(error){
    console.error(`error: ${error}`);
    return;
  }

  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
}
