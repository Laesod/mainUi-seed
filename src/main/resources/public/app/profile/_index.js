'use strict';

var bulk = require('bulk-require');

module.exports = angular.module('profile', []);

angular.module("profile").config(function($stateProvider, $locationProvider, $urlRouterProvider) {
    $stateProvider
        .state('app.profileDetails', {
            url: '/profile-details',
            controller: 'ProfileDetailsCtrl',
            templateUrl: "views/profile-details.html",
            title: 'Profile details'
        });
});

bulk(__dirname, ['./**/!(*_index|*.spec).js']);