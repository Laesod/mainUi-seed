'use strict';

var bulk = require('bulk-require');

module.exports = angular.module('documents', []);

angular.module("documents").config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
        .state('app.documentsList', {
            url: '/documents-list',
            controller: 'DocumentsListCtrl',
            templateUrl: "views/documents-list.html",
            title: 'My Documents'
        });
});

bulk(__dirname, ['./**/!(*_index|*.spec).js']);