
config = window.config || {}

socket = io.connect config.host + "/" + config.code

socket.on 'connect', (data) ->
	console.log 'creating game ' + config.code + '...'
	socket.emit 'initialize'

socket.on 'player-join', (player) ->
	console.log 'player ' + player.name + ' join the game'
	$('#userlist').append '<li data-player="' + player.name + '">' + player.name + '</li>'

socket.on 'player-leave', (player) ->
	console.log 'player ' + player.name + ' leave the game'
	$('#userlist li[data-player=' + player.name + ']').remove();

socket.on 'move', (data) ->
	console.log data.name + " - " + data.move