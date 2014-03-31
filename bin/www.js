#!/usr/bin/env node
var debug = require('debug')('cat-manager');
var app = require('../app');
var db = require('../lib/store');

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
