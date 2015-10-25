var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var watson = require('watson-developer-cloud');
var testMod = require('./public/js/testModule.js');

var prevFrom = '';
var inPause = false;

var players = [];
var score = [0,0];

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
	  console.log('hello');
	  console.log(testMod.getX());
      io.emit("4scoreandsomeyearsago", score);
	  io.emit('connectMessage', from, msg);
  });

  socket.on('GameOver', function(isInPause){
	  inPause = isInPause;
  });
  
    socket.on('PauseExit', function(isInPause){
	  inPause = isInPause;
	  io.emit('playerTurn');
  });

  socket.on('SomeoneGetsAPoint', function(from){
    for(i = 0; i < players.length; i++){
      if(players[i] == from){
          scores[i]++;
          
            io.emit("4scoreandsomeyearsago", score);
          }
      }
   });
  
  socket.on('chatMessage', function(from, msg){
	  if (prevFrom !== from && !inPause){
		prevFrom = from;
		inPause = true;
		io.emit('pause');
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
