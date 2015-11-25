'use strict';

module.exports = angular.module('globals', []);

function globalService($rootScope, $http, $q, $cookies, $timeout, APP_SETTINGS, $mdToast) {
    var service = {};

    service.request = function(params) {
        var deferred = $q.defer();
        params.withCredentials = true;

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

    service.displayToast = function(parameters) {
        var templateUrl = APP_SETTINGS.contextPrefix + "/templates/toast-template.html";

        $rootScope.toastMessageText = [parameters.messageText];
        $rootScope.toastMessageType = parameters.messageType;

        var oToast = {
            controller: "ToastCtrl",
            templateUrl: templateUrl,
            hideDelay: 3000,
            position: "top right"
        };

        $mdToast.show(oToast);
    };

    return service;
}

module.exports.service('globalService', globalService);