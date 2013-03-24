
class Game

	constructor: (@sio, @code) ->
		@sio.of('/' + @code)
			.on 'connection', (socket) ->
  			socket.on 'move', (data) ->
  				socket.broadcast.emit 'move', data
	  		socket.on 'disconnect', ->

		@players = []

	addPlayer: (player) ->
		@player.push player

	removePlayer: (player) ->
		@player.remove player

	getCode: -> @code


module.exports = Game;