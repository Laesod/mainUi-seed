'use strict';

var entriesModule = require('../_index');
var url = require('url');

function EntriesListCtrl($scope, $state, $http, APP_SETTINGS, globalService, $window, entriesService) {
    $scope.onAdd = function () {
        $state.go("app.entryNew");
    }
}

entriesModule.controller('EntriesListCtrl', EntriesListCtrl);

