var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var watson = require('watson-developer-cloud');
var testMod = require('./public/js/testModule.js');
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


var prevFrom = '';
var inPause = false;
var gameOver = false;
var randomTopic = require('./public/js/randomTopic.js');

var players = [];
var score = [0,0];

var xmlhttp = new XMLHttpRequest();
          

function myFunction(msg) {
  var res = msg.split(" ");
  var url = "http://api.musixmatch.com/ws/1.1/track.search?apikey=ea6c206263d8c53630bdafdfe5f36afe&q_track=";
  for(i = 0; i < res.length - 1; i++ ){
    url += res[i] +"%20";
  }
  url += res[res.length - 1]+"&f_has_lyrics=1";

  xmlhttp.open("GET", url, false);
  xmlhttp.send();
  var ret = JSON.parse(xmlhttp.responseText);
  // console.log(ret.message.body.track_list[0].track.primary_genres);
  console.log('matches ' + ret.message.header.available);
  return ret.message.header.available;
}

function endGame() {
	  for(i = 0; i < players.length; i++){
		  console.log(players[i] + ' ' + prevFrom);
		  if(players[i] == prevFrom){
			  score[i]++;
			  io.emit("4scoreandsomeyearsago", score);
		  }
	  }
	  prevFrom = '';
	  isInPause = false;
}

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
  socket.on('connectMessage', function(from, msg, user){
	if (players.length < 2){
		players.push(user);
	}
    io.emit("4scoreandsomeyearsago", score);
    io.emit('randotopico', 'Topic will be chosen when game starts!');
	io.emit('connectMessage', from, msg);
    
  });

  socket.on('GameOver', function(isInPause){
	endGame();
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
	  if (prevFrom === ''){
		var rawr = randomTopic.getTopic();
        io.emit('randotopico', rawr);
	  }
	  if (prevFrom !== from && !inPause){
		var matches = myFunction(msg);
		if (matches > 200 || matches === 0){
			endGame();
			io.emit('StopThePlay');
		}
		prevFrom = from;
		inPause = true;
		io.emit('pause');
		io.emit('chatMessage', from, msg);
	  }
	  if (msg === '%reset') {
		  score = [0,0];
		  players = [];
		  io.emit("4scoreandsomeyearsago", score);
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

