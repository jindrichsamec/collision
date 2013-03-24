generator = require 'password-generator'

module.exports = (app, controller) ->

	index : (req, res) ->
		code = generator 6, true, '[0-9][A-Z]'

		game = controller.createGame code

		res.render 'index',
			code : game.getCode()
			host : req.protocol + '://' + req.host + ':' + app.get 'port'
		return
	,

	gamepad : (req, res) ->

		#game = controller.findByCode req.params.code
		#if (game)
		res.render 'gamepad',
			code : req.params.code
			host : req.protocol + '://' + req.host + ':' + app.get 'port'
		#else
		#	res.status(404).send('404')

		return