/**
 * Created by root on 8/5/14.
 */
var flash = require('connect-flash');
var express = require('express'),
    app = express(),
    http = require('http'),
    mongoose = require('mongoose'),
    path = require('path'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

require('./api/service/passport')(passport);


//setting mongodb url and connecting
var mongo_uri = 'localhost';
var mongo_db = 'baas';
var db = mongoose.connect('mongodb://' + mongo_uri + '/' + mongo_db);

//bodyparser to fetch params from requests
var bodyParser = require('body-parser');
var methodOverride = require('method-override')

app.use(methodOverride());
app.use(bodyParser());


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// set up our express application
app.use(cookieParser()); // read cookies (needed for auth)

// required for passport
app.use(session({
    secret: 'howhowhowhowhow'
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
//serve angularJS file from /app
app.use(express.static('./app'));

// Bootstrap models
require('./models/users');
require('./models/product');
require('./models/complaints');
require('./models/CUS');

//services route

//create http server liston on 3000
var httpServer = http.createServer(app);

//var io = require('socket.io').listen(httpServer);
//
//var socket = require('./routes/socket.js')(io);
//global.io = io;

require('./routes/adaptation')(app, passport);

httpServer.listen(3000);

console.log('Express http server started on http://127.0.0.1:3000/  ');

module.exports = app;