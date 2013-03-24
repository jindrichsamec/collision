Game = require './game'

class Controller

	# []
	@games

	# socket-io instance
	@sio

	constructor: (@sio) ->
		@games = []

	createGame: (code) ->
		game = new Game @sio, code
		@games.push game
		game

	findByCode: (code) ->
		null


module.exports = Controller


