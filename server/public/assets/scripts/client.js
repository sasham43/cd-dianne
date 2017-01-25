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
    $("#status").html(data.status);
    $("#track").html(data.track);    
  });

  $(".play").on("click", function(){
    socket.emit('play');
  });
  $(".prev").on("click", function(){
    socket.emit('prev');
  });
  $(".next").on("click", function(){
    socket.emit('next');
  });
  $(".eject").on("click", function(){
    socket.emit('eject');
  });

  console.log('loaded.');
})
