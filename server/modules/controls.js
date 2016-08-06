var cp = require('child_process');

var child;
var trackNumber = 0;

var play = function(data){
  console.log('play');
  var args = ['-track', trackNumber];
  var options = { cwd: undefined, env: process.env };
  // console.log('process.env.PATH:', process.env.PATH );
  if(child){
    child.stdin.write('q', errorLog);
  } else {
    // console.log('track=' + trackNumber + ' cdplayer.sh');
    child = cp.spawn('cdplayer.sh', args, options).on('error', function( err ){ throw err });
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
};

var prev = function(data){
  console.log('prev');
  child.stdin.write('<', errorLog);
  trackNumber--;
};

var next = function(data){
  console.log('next');
  // cp.exec('>', cpLog);
  child.stdin.write('>', errorLog);
  trackNumber++;
};

var eject = function(data){
  console.log('eject');
  if(child){
    child.stdin.write('q', function(){
      cp.exec('eject /dev/cdrom', errorLog);
    });
  } else {
    cp.exec('eject /dev/cdrom', errorLog);
  }
  trackNumber = 0;
};


function errorLog(error){
  if(error){
    console.log('error writing to child.stdin:', error);
  }
}

module.exports.play = play;
module.exports.prev = prev;
module.exports.next = next;
module.exports.eject = eject;
