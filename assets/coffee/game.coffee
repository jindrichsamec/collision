
config = window.config || {}

socket = io.connect config.host + "/" + config.code

socket.on 'connect', (data) ->
	console.log 'creating game ' + config.code + '...'
	socket.send config.code

socket.on 'move', (data) ->
	console.log data.player + " - " + data.move