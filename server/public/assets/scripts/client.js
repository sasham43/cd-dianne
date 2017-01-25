$(function(){
  var socket = io();

  socket.on('socket connected', function(){
    console.log('socket connected');
  });

  socket.on('disconnect', function(data){
    console.log('socket disconnected, attempting reconnect...');
    socket.reconnect();
  });

  socket.on('status', function(data){
    console.log('status:', data);
    $("#status").html(data.status);
    $("#track").html(data.track);
  });

  $(".play").on("click", function(){
    socket.emit('play');
    window.setTimeout(2000, function(){
      socket.emit('get status');
    });
  });
  $(".prev").on("click", function(){
    socket.emit('prev');
    window.setTimeout(2000, function(){
      socket.emit('get status');
    });
  });
  $(".next").on("click", function(){
    socket.emit('next');
    window.setTimeout(2000, function(){
      socket.emit('get status');
    });
  });
  $(".eject").on("click", function(){
    socket.emit('eject');
    window.setTimeout(2000, function(){
      socket.emit('get status');
    });
  });

  console.log('loaded.');
})
