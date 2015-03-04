import generator from 'password-generator'

export default {

	handle: (req, res) => {
		res.send({gameId: generator(6, true, '[0-9][A-Z]')});
	}

}