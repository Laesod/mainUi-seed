'use strict';

var documentsModule = require('../_index');
var url = require('url');

function DocumentsListCtrl($scope, $http, APP_SETTINGS, globalService, $window) {
    $http.get(APP_SETTINGS.apiGatewayGetUserProfileUrl + '?' + new Date().getTime()).
    success(function(response) {
        $scope.authValues = response;
    });
}

documentsModule.controller('DocumentsListCtrl', DocumentsListCtrl);