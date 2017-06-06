var express = require('express');
var app = express();
var PORT = 3000;
var socket = require('socket.io');

var server = app.listen(PORT, function(){
	console.log("Listening on port " + PORT);
});

//Statid Files
app.use(express.static('public'));

//Socket Setup
var io = socket(server);

io.on('connection', function(socket){
	console.log('connection made!');

	socket.on('chat', function(data){
		io.sockets.emit('chat', data)
	})

	socket.on('typing', function (data) {
		socket.broadcast.emit('typing', data)
    })
})