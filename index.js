var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var prevFrom = '';
var inPause = false;

// Initialize appication with route / (that means root of the application)
app.get('/', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, 'views/login.html'));
});

app.get('/index.html', function(req, res){
  var express=require('express');
  app.use(express.static(path.join(__dirname)));
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

// Register events on socket connection
io.on('connection', function(socket){
  socket.on('connectMessage', function(from, msg){
	  io.emit('connectMessage', from, msg);
  });

  socket.on('PauseEnter', function(isInPause){
	  inPause = isInPause;
	  io.emit('pause');
  });
  
    socket.on('PauseExit', function(isInPause){
	  inPause = isInPause;
  });

  socket.on('SomeoneGetsAPoint', function(from){
    for(int i = 0; i < players.length; i++){
      if(players[i] == from){
          scores[i]++;
          if(i == 0){
            // document.getElementById('Ascore').innerHTML = scores[i];
          }else{
            // document.getElementById('Bscore').innerHTML = scores[i];

          }
      }
    }
  });
  
  socket.on('chatMessage', function(from, msg){
	  if (prevFrom !== from && !inPause){
		prevFrom = from;
		io.emit('playerTurn');
		io.emit('chatMessage', from, msg);
	  }
  });
  socket.on('notifyUser', function(user){
    io.emit('notifyUser', user);
  });
});

// Listen application request on port 3000
http.listen(process.env.port || 3000, function(){
  console.log('listening on :3000');
});
