var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var debug  = require('debug')('collision:server');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var rooms = require('./routes/rooms');

var app = require('./server/express');
var http = require('./server/http');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/room', rooms);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function(err, req, res, next) {
  // development error handler
  // will print stacktrace
  var stacktrace = (app.get('env') === 'development') ? err : {};

  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: stacktrace
  });
});

debug('app started');