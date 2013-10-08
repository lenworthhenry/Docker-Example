
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy
  , mongodb = require('mongodb')
  , mongoose = require('mongoose')
, flash = require('connect-flash');

var app = express();


// configure Express
app.configure(function() {
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.bodyParser());
app.use(express.session({ secret: 'CarthagoDelendaEst' }));
// Initialize Passport! Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(flash());

require('./routes')(app);


app.use(express.static(path.join(__dirname, 'public')));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

/**app.get('/', routes.index);*/



http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

