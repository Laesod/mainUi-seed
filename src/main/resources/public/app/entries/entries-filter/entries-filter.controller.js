'use strict';

var entriesModule = require('../_index');
var url = require('url');

function EntriesFilterCtrl($scope, $state, $stateParams, $rootScope, $timeout, $http, APP_SETTINGS, globalService, $window, entriesService) {
    $scope.getEntryTypes = function () {
        entriesService.getEntryTypesForProject({ projectGuid: $rootScope.currentProjectGuid }).then(function (entryTypesForProject) {
            $scope.entryTypes = entryTypesForProject;
        });
    }
  
    $scope.getEntryTypes();
    
    $scope.onBack = function(){
        $state.go("app.entriesList");
    }  
    
  
}

entriesModule.controller('EntriesFilterCtrl', EntriesFilterCtrl);

