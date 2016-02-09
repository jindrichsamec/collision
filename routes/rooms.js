var express = require('express');
var debug = require('debug')('collision:server:rooms');
var router = express.Router();
var io = require('../server/socket');

/* GET users listing. */
router.get('/:id', function(req, res, next) {
	var roomName = req.params.id;
	debug('someone joining room no. %s', roomName);
  res.render('rooms', { title: 'Room', room: roomName });
});




module.exports = router;
