'use strict';

module.exports = angular.module('globals', []);

function globalService($http, $q, $cookies, $timeout, APP_SETTINGS) {
    var service = {};

    service.request = function(params) {
        var deferred = $q.defer();

        $http(params).
        success(function(data) {
            deferred.resolve(data);
        }).
        error(function(err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    service.logout = function() {
        var deferred = $q.defer();
        var url = APP_SETTINGS.apiUrl.apiGatewayLogoutUrl;

        $http.get(url, {
            withCredentials: true
        }).
        success(function(data) {
            deferred.resolve(data);
        }).
        error(function(err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    return service;
}

module.exports.service('globalService', globalService);