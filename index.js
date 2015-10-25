var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var prevFrom = '';
var inPause = false;
var randomTopic = require('./public/js/randomTopic.js');

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
    console.log(randomTopic.getTopic());
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
    for(i = 0; i < players.length; i++){
      if(players[i] == from){
          scores[i]++;
            io.emit("4scoreandsomeyearsago", function("A =" + scores[0] + "B = " +score[1]));
            // document.getElementById('score').innerHTML = "A =" + scores[0] + "B = " +score[1];
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

