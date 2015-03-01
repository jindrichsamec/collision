import Game from './game'
import Controller from './controller'
import generator from 'password-generator'

export default {

	handle: function(req, res) {
		var code, game;
		code = generator(6, true, '[0-9][A-Z]');
		game = controller.createGame(code);
		res.render('index', {
			code: game.getCode(),
			host: req.protocol + '://' + req.host + ':' + app.get('port')
		});
	},

	gamepad: function(req, res) {
		res.render('gamepad', {
			code: req.params.code,
			host: req.protocol + '://' + req.host + ':' + app.get('port')
		});
	}

};