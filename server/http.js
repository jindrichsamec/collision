var app = require('./express');
var http = require('http').createServer(app);
http.listen(3000);

module.exports = http;