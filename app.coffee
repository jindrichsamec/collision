express = require 'express'
http = require 'http'
path = require 'path'
sio =
less = require 'less-middleware'
coffee = require 'connect-coffee-script'

# create app
app = express()
server = http.createServer(app)
sio = require('socket.io').listen server

Controller = require './model/controller'
routes = require('./routes')(app, new Controller(sio))

# configuration
app.configure ->
  app.set 'port', process.env.PORT || 3000
  app.set 'views', __dirname + '/views'
  app.set 'view engine', 'ejs'
  app.use express.logger 'dev'
  app.use express.bodyParser()
  app.use express.methodOverride()
  app.use app.router
  app.use less
    src: __dirname + '/assets/less',
    dest: __dirname + '/public/assets/css',
    prefix: '/assets/css'
    compile: true
  app.use coffee
    src: __dirname + '/assets/coffee',
    dest: __dirname + '/public/assets/js',
    prefix: '/assets/js',
    compress: true

  app.use express.static path.join __dirname, 'public'

# development environmet configuration
app.configure 'development', ->
  app.use express.errorHandler()

# routing
app.get '/', routes.index
app.get '/favicon.ico', (req, res) -> res.status 404
app.get '/:code', routes.gamepad

# http server
server.listen app.get('port'), ->
  console.log 'Express server listening on port ' + app.get 'port'

