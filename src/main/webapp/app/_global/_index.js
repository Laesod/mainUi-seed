'use strict';

var requires = [
    'ui.router',
    'ngCookies',
    'templates',
    'globals',
    'generalLayout',
    'documents',
    'ngMessages',
    'ngCookies',
    'ngMaterial'
];

module.exports = angular.module('app', requires);

var bulk = require('bulk-require');
bulk(__dirname, ['./**/!(_index|main|*.spec).js']);
