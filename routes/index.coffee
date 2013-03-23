generator = require 'password-generator'

module.exports = (app) ->

	index : (req, res) ->
		code = generator 6, true, '[0-9][A-Z]'

		res.render 'index',
		code : 'asdasd'
		host : req.host + ':' + app.get 'port'
		return
	,

	gamepad : (req, res) ->
		res.render 'gamepad', code : req.params.code
		return