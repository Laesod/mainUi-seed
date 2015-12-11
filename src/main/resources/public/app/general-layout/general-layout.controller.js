'use strict';

var generalLayoutModule = require('./_index');

function GeneralLayoutCtrl($scope, $window, APP_SETTINGS, globalService, $cookies) {
    $scope.currentLanguageCode = APP_SETTINGS.appLanguage.toUpperCase();

    $scope.logout = function() {
        var url = APP_SETTINGS.apiUrl.authUrl + "/#/login?location=" + encodeURIComponent($window.location.origin + $window.location.pathname + $window.location.hash);
        globalService.logout().then(function() {
            $window.location.href = url;
        }, function() {
            $window.location.href = url;
        });
    };

    $scope.changeLanguage = function() {
        if ($scope.currentLanguageCode == "EN") {
            $cookies.put("appLanguage", "fr");
        } else {
            $cookies.put("appLanguage", "en");
        }

        $window.location.reload();
    };
}

generalLayoutModule.controller('GeneralLayoutCtrl', GeneralLayoutCtrl);