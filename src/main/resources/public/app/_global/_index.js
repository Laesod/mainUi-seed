'use strict';

var requires = [
    'ui.router',
    'ngCookies',
    'templates',
    'globals',
    'generalLayout',
    'ngCookies',
    'ngMaterial',
    'ngTagsInput',
    'pascalprecht.translate',
    'iosDblclick',
    'ngFileUpload',
    'ngFileSaver',
    'tasks',
    'projects',
    'profile',
];

module.exports = angular.module('app', requires);

var bulk = require('bulk-require');
bulk(__dirname, ['./**/!(_index|main|*.spec).js']);