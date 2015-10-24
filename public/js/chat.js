var socket = io(); 
var login = true;

function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
  socket.emit('chatMessage', from, message);
}
$('#m').val('').focus();
  return false;
}
 
function notifyTyping() { 
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}
 
socket.on('chatMessage', function(from, msg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  $('#messages').append('<li><b style="color:' + color + '">' + from + '</b>: ' + msg + '</li>');
});
 
socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').text(user + ' is typing ...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 10000);
});
 

function setName(){
  var name = document.getElementById('username').value;
  $('#user').val(name);
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion');
}
 
$(document).keypress(function(e) {
	console.log(login);
    if(e.which == 13 && login) {
		setName();
	  if(login) {
		$('#container').addClass('inactiveDiv');
		$('#container').removeClass('activeDiv');

		$('#chat_container').removeClass('inactiveDiv');
		$('#chat_container').addClass('activeDiv');

		login = false;
	  } else {
		$('#chat_container').removeClass('activeDiv');
		$('#chat_container').addClass('inactiveDiv');

		$('#container').removeClass('inactiveDiv');
		$('#container').addClass('activeDiv');
		login = true;
	  }
		return false;
    }
});
 
$(document).ready(function(){
  /* var name = makeid(); */
  /* var name = document.getElementById('username').value; */
  /* $('#user').val(name); */
  /* socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the discussion'); */
});
 
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

var current_sec  =20
var seconds_left = 20;
var min_sec = 10

socket.on('playerOnesTurn', function(){
  var interval = setInterval(function() {
      document.getElementById('timer_div').innerHTML = --seconds_left;

      if (seconds_left <= 0)
      {
          socket.emit('pauseB'); 
          clearInterval(interval);
      }
  }, 1000);
});

socket.on('playerTwosTurn', function(){
  var interval = setInterval(function() {
      document.getElementById('timer_div').innerHTML = --seconds_left;

      if (seconds_left <= 0)
      {
          document.getElementById('timer_div').innerHTML = 'You are ready'; //--------emit signal
          clearInterval(interval);
          socket.emit('pauseA'); 
      }
  }, 1000);
});

socket.on('pauseA', function(){
  var interval = setInterval(function() {
      document.getElementById('timer_div').innerHTML = --seconds_left;

      if (seconds_left <= 0)
      {
          document.getElementById('timer_div').innerHTML = 'You are ready'; //--------emit signal
          clearInterval(interval);
                    socket.emit('playerOnesTurn'); 

      }
  }, 1000);
});

socket.on('pauseB', function(){
  var interval = setInterval(function() {
      document.getElementById('timer_div').innerHTML = --seconds_left;

      if (seconds_left <= 0)
      {
          document.getElementById('timer_div').innerHTML = 'You are ready'; //--------emit signal
          clearInterval(interval);
          socket.emit('playerTwosTurn'); 

      }
  }, 1000);
});
