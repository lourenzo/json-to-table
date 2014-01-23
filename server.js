#!/usr/bin/env node
'use strict';

/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 1337);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.title = 'JSON to Table';

// GET / - shows the FORM
app.get('/', function (req, res) {
  res.render('form', { title:  app.title });
});

// POST /
app.post('/', function (req, res) {
  console.log(req.body);
  var json;
  if (req.body.type=='JSON') {
    try {
      json = JSON.parse(req.body.json_text);
    } catch (e) {
      return res.render('form', {
        title: app.title,
        error: 'Invalid JSON'
      });
    }
  }

  console.log(json);

  function renderTable (argument) {
    res.render('table', { title: app.title, dataHeaders: [''] });
  }
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
