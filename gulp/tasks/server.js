'use strict';

var config  = require('../config');
var http    = require('http');
var express = require('express');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var morgan  = require('morgan');

/*
  this task was needed to serve build folder as a dependency for 'watch' task;
  not used anymore.
  instead, the build folder is served by command -> mvn spring-boot:run
*/
gulp.task('server', function() {
    var server = express();

    // log all requests to the console
    server.use(morgan('dev'));
    server.use(express.static(config.root));

    // Serve index.html for all routes to leave routing up to Angular
    server.all('/*', function(req, res) {
        res.sendFile('index.html', {
            root: config.root
        });
    });

    // Start webserver if not already running
    var s = http.createServer(server);

    s.on('error', function(err){
        if(err.code === 'EADDRINUSE') {
            gutil.log('Development server is already started at port ' + config.serverport);
        } else {
          throw err;
        }
    });

    s.listen(config.serverport);
});
