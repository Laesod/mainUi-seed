'use strict';

var bulk = require('bulk-require');

module.exports = angular.module('entries', []);

angular.module("entries").config(function($stateProvider, $locationProvider, $urlRouterProvider) {
   $stateProvider
      .state('app.entryDetails', {
         url: '/entry-details/:entryGuid',
         controller: 'EntryDetailsCtrl',
         templateUrl: "views/entry-details.html",
         title: 'Entry Details'
      })
      .state('app.entryNew', {
         url: '/entry-new',
         controller: 'EntryNewCtrl',
         templateUrl: "views/entry-new.html",
         title: 'Entry New'
      })
});

bulk(__dirname, ['./**/!(*_index|*.spec).js']);