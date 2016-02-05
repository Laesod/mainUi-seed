'use strict';

var bulk = require('bulk-require');

module.exports = angular.module('projects', []);

angular.module("projects").config(function ($stateProvider, $locationProvider, $urlRouterProvider) {
   $stateProvider
      .state('app.projectDetails', {
         url: '/project-details/:projectGuid',
         controller: 'ProjectDetailsCtrl',
         templateUrl: "views/project-details.html",
         title: 'Project Details'
      })
      .state('app.projectNew', {
         url: '/project-new',
         controller: 'ProjectNewCtrl',
         templateUrl: "views/project-new.html",
         title: 'Project New'
      });
});

bulk(__dirname, ['./**/!(*_index|*.spec).js']);