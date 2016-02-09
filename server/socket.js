var debug = require('debug')('collision:socket');
var http = require('./http');
var io = require('socket.io')(http);
var immutable = require('immutable');
var Map = immutable.Map;

var connections = immutable.List();
var rooms = immutable.List();
var users = immutable.Map();

var User = immutable.Record({id: null, name: null});

io.on('connection', function(socket) {

 	connections = connections.push(socket);

 	debug('%s connected (total connections %d)', socket.id, connections.size);

 	socket.on('join', function(message) {

 		var roomName = message.room;
 		var user = new User({
 					id: socket.id,
 					name: message.username
 				});
 		var members = users.get(roomName) || immutable.List();

 		if (!rooms.has(roomName)) {
 			rooms = rooms.push(roomName);
 		}
 		members = members.push(user);
 		users = users.set(roomName, members);

 		debug('%s joined room %d!', socket.id, roomName);
 		socket.join(roomName);
 	});

 	socket.on('click', function(message) {
 		debug('%s clicked', socket.id, message);
 		var roomName = rooms.get(socket.id);
 		socket.to(roomName).emit('click', message, socket.id);
 	});

 	socket.on('disconnect', function() {
 		socket.disconnect();

 		debug('%s left room', socket.id);
 		connections.delete(connections.indexOf(socket));
 	});
});

var updateStatus = function() {
	rooms.forEach(function(roomName) {
		io.to(roomName).emit('status', users.get(roomName));
	});
	setTimeout(updateStatus, 500);
}

updateStatus();


module.exports = io;