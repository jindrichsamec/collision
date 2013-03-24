
config = window.config || {}


$('#signin').on 'click', ->
	name = $('#login').val()

	if name?
		url = config.host + "/" + config.code
		socket = io.connect url

		socket.on 'connect', () ->
			$('#status').attr('class', 'label label-info').html "connecting..."
			socket.emit 'signin', name : name, () ->
				$('#status').attr('class', 'label label-success').html "online"
				return

		socket.on 'disconnect', (data) ->
			$('#status').attr('class', 'label').html "offline"

		socket.on 'end-game', (data) ->
			$('#status').attr('class', 'label').html "offline"


		$('#gamepad a').on 'click', ->
			console.log 'moving...'
			socket.emit 'move',
				name: name
				move: $(this).attr 'data-move'

	else
		alert "Please fill your name"
		$('#login').focus().select()
	return

