var cp = require('child_process');

var child;
var message;
var trackNumber = 0;

var emit_status = function(input){
  message = input;
};

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
  emit_status({status:'PLAYING', track: trackNumber});
  child.stdout.on('data', function(data) {
    console.log('stdout: ' + data);
  });
  child.stderr.on('data', function(data) {
    console.log('stderr: ' + data);
  });
  child.on('close', function(code) {
    console.log('closing code: ' + code);
    child = undefined;
  });
};

var prevTrack = function(data){
  console.log('prev');
  if(child){
    child.stdin.write('<', errorLog);
    trackNumber--;
    emit_status({status:'PLAYING', track: trackNumber});
  }
};

var nextTrack = function(data){
  console.log('next');
  if(child){
    child.stdin.write('>', errorLog);
    trackNumber++;
    emit_status({status:'PLAYING', track: trackNumber});
  }
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
  emit_status({status: 'STOPPED', track: trackNumber });
};


function errorLog(error){
  if(error){
    console.log('error writing to child.stdin:', error);
  }
}

module.exports.play = play;
module.exports.prevTrack = prevTrack;
module.exports.nextTrack = nextTrack;
module.exports.eject = eject;
module.exports.status = message;
