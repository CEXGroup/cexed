
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var socket = require('./routes/socket.js');
var http = require('http');

console.log('A');

//var a = express();
//var app = http.createServer(ex);
var app = module.exports = express.createServer();

// Hook Socket.io into Express
var io = require('socket.io').listen(app);

// Configuration

console.log('B');

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {
    layout: false
  });
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use(app.router);
});

console.log('C');

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

console.log('D');

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);
console.log('F')
// Socket.io Communication

io.sockets.on('connection', socket);
console.log('g');

// Start server

app.listen(process.env.port, function(){
  console.log('Express server listening on port %d in %s mode', app.address().port, app.settings.env);
});
