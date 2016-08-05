$(function(){
  var socket = io();

  socket.on('socket connected', function(){
    console.log('socket connected');
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
