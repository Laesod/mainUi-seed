'use strict';

var bulk = require('bulk-require');

module.exports = angular.module('tasks', []);

angular.module("tasks").config(function($stateProvider, $locationProvider, $urlRouterProvider) {

});

bulk(__dirname, ['./**/!(*_index|*.spec).js']);