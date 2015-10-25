'use strict';

module.exports = angular.module('globals', []);

function globalService($http, $q, $cookies, $timeout, APP_SETTINGS) {
    var service = {};
    return service;
}

module.exports.service('globalService', globalService);
