'use strict';

var entriesModule = require('../_index');
var url = require('url');

function EntryNewCtrl($rootScope, $scope, $timeout, $http, APP_SETTINGS, globalService, $window, entriesService, projectsService) {
    $scope.groupSearchText = "";
    $scope.selectedProjectGroups = [];
    
    $scope.getEntryTypes = function () {
        entriesService.getEntryTypesForProject({ projectGuid: $rootScope.currentProjectGuid }).then(function (entryTypesForProject) {
            $scope.entryTypes = entryTypesForProject;
        });
    }

    projectsService.getProjectGroups({ projectGuid: $rootScope.currentProjectGuid}).then(function (projectGroups) {
        $scope.projectGroups = projectGroups;
    });
    
    $scope.searchProjectGroup = function(groupSearchText){
        return _.filter($scope.projectGroups, function(group){
            return group.groupName.indexOf(groupSearchText) > -1;
        })
    }    
}

entriesModule.controller('EntryNewCtrl', EntryNewCtrl);

