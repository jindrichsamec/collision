class Game

	@sio
	@code
	@socket
	@players = []

	constructor: (@sio, @code) ->
		namespace = '/' + @code

		@sio.of(namespace)
			.on 'connection', (socket) =>

				socket.on 'initialize', (data) =>
					@initialize socket

				socket.on 'signin', (data, fn) =>
					@addPlayer data.name, socket
					fn()

	initialize: (@game) ->
		@game.on 'disconnect', () =>
			@game.broadcast.emit 'end-game'

	setMaster: (@master) ->
		@master.on 'start-game', (data) =>
			@maste.broadcast.emit 'start-game'

		@master.on 'pause-game', (data) =>
			@master.broadcast.emit 'pause-game'

		@master.on 'end-game', (data) =>
			@master.broadcast.emit 'end-game'

		@master.on 'disconnect', () =>
			@master.broadcast.emit 'end-game'

		@master.send 'master'

	addPlayer: (name, player) ->
		player.on 'move', (data) =>
			@game.emit 'move', data

		player.on 'disconnect', =>
			@game.emit 'player-leave', "name" : name

		@game.emit 'player-join', "name" : name

	getCode: -> @code

module.exports = Game;