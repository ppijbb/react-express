var http = require('http');
var fs = require('fs');
var url = require('url');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var app = express();
var logger = require('morgan');
var engines = require('consolidate');

var indexRouter = require('./routes/index');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.set('views',__dirname + '/views');

app.engine('html',engines.mustache);
app.set('view engine','html');

app.use(express.static(__dirname + '/public'));

app.use('/',indexRouter);
module.exports = app;

var server = app.listen(3000,function(){
	console.log('start server in 3000');
	});
