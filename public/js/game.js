var socket;
var io;
var player = true;
var seconds_left = 10;

// Send in the server socket
function init(sio, ssocket) {
	io = sio;
	socket = ssocket;
}

function analyzeLyrics(lyrics){
	
}

socket.on('getTurn', function(){
	player = !player;
	socket.emit('theTurn', player);
});

var interval = setInterval(function() {
    document.getElementById('timer_div').innerHTML = --seconds_left;

    if (seconds_left <= 0)
    {
        document.getElementById('timer_div').innerHTML = 'You are ready'; //--------emit signal
        clearInterval(interval);
    }
}, 1000);