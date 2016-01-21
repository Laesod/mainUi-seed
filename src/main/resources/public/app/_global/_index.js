'use strict';

var requires = [
    'ui.router',
    'ngCookies',
    'templates',
    'globals',
    'generalLayout',
    'documents',
    'ngCookies',
    'ngMaterial',
    'pascalprecht.translate',
    'iosDblclick',
    'ngFileUpload',
    'ngFileSaver',
    'tasks',
    'profile',
];

module.exports = angular.module('app', requires);

var bulk = require('bulk-require');
bulk(__dirname, ['./**/!(_index|main|*.spec).js']);