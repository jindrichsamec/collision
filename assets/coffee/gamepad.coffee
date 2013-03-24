
config = window.config || {}

socket = io.connect(config.host + "/" + config.code)
socket.on 'connect', (data) ->
	console.log 'connecting player...'
	socket.emit 'login', player: 'player'

$('#gamepad a').on 'click', ->
	console.log 'move...'
	socket.emit 'move',
		player: 'player'
		move: $(this).attr 'data-move'