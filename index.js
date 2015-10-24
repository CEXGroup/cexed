var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var prevFrom = '';

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

  socket.on('chatMessage', function(from, msg){
	  if (prevFrom !== from){
		prevFrom = from;
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
