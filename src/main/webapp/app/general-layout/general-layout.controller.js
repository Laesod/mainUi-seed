'use strict';

var generalLayoutModule = require('./_index');

function GeneralLayoutCtrl($scope, $window, APP_SETTINGS, globalService) {
    $scope.logout = function() {
        globalService.logout().then(function() {
            $window.location.href = APP_SETTINGS.authUrl + "/#/login?location=" + encodeURIComponent($window.location.origin);
        }, function() {
            $window.location.href = APP_SETTINGS.authUrl + "/#/login?location=" + encodeURIComponent($window.location.origin);
        });
    };
}

generalLayoutModule.controller('GeneralLayoutCtrl', GeneralLayoutCtrl);