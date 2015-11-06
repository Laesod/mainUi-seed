'use strict';

var generalLayoutModule = require('./_index');

function GeneralLayoutCtrl($scope, $window, APP_SETTINGS, globalService) {
    $scope.logout = function() {
        var url = APP_SETTINGS.apiUrl.authUrl + "/#/login?location=" + encodeURIComponent($window.location.origin + '/mainUi');
        globalService.logout().then(function() {
            $window.location.href = url;
        }, function() {
            $window.location.href = url;
        });
    };
}

generalLayoutModule.controller('GeneralLayoutCtrl', GeneralLayoutCtrl);