'use strict';

var documentsModule = require('../_index');
var url = require('url');

function ProfileDetailsCtrl($scope, $http, APP_SETTINGS, globalService, $window) {
    // $http.get(APP_SETTINGS.apiUrl.apiGatewayGetUserProfileUrl + '?' + new Date().getTime()).
    // success(function(response) {
    //     $scope.authValues = response;
    // });
}

documentsModule.controller('ProfileDetailsCtrl', ProfileDetailsCtrl);