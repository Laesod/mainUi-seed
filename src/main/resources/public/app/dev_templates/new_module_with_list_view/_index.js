'use strict';

var bulk = require('bulk-require');

module.exports = angular.module('projects', []);

angular.module("projects").config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
        .state('app.projectsList', {
            url: '/projects-list',
            controller: 'ProjectsListCtrl',
            templateUrl: "views/projects-list.html",
            title: 'My Projects'
        });
});

bulk(__dirname, ['./**/!(*_index|*.spec).js']);