var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

user = [];
connections = [];
var port = 3000;

server.listen(port, function() {
  console.log("Listening on port " + port);
});

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html')
})

io.sockets.on('connection', function(socket){
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

	//disconnect
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disonnected: %s sockets connected', connections.length);
	}) 

	//send Message
	socket.on('send message', function(data){
		console.log(data);
		io.sockets.emit('new message', {msg:data});
	})
	
})