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
    setTimeout(function(){
      socket.emit('get status');
    }, 1000);
  });
  $(".prev").on("click", function(){
    socket.emit('prev');
    setTimeout(function(){
      socket.emit('get status');
    }, 1000);
  });
  $(".next").on("click", function(){
    socket.emit('next');
    setTimeout(function(){
      socket.emit('get status');
    }, 1000);
  });
  $(".eject").on("click", function(){
    socket.emit('eject');
    setTimeout(function(){
      socket.emit('get status');
    }, 1000);
  });

  console.log('loaded.');
})
