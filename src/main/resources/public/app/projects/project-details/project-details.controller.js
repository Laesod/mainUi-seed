'use strict';

var projectsModule = require('../_index');
var url = require('url');

function ProjectDetailsCtrl($scope, $rootScope, $stateParams, $q, $timeout, $http, APP_SETTINGS, globalService, $window, projectsService) {
    $scope.projectGuid = $stateParams.projectGuid;

    $scope.getPossibleRoles = function (query, currentRoles) {
        return projectsService.getProjectRoles({projectGuid: $scope.projectGuid, payload: {nameContains: query, currentRoles: currentRoles}});
    };
    
    $scope.getPossibleGroups = function (query, currentGroups) {
        return projectsService.getProjectGroups({projectGuid: $scope.projectGuid, payload: {nameContains: query, currentGroups: currentGroups}});
    };    

    $scope.isAdmin = globalService.checkPermissions($scope.projectGuid, ["admin"]);

    projectsService.getProject({ projectGuid: $scope.projectGuid }).then(function (data) {
        $scope.project = data;
    });

    if ($scope.isAdmin) {
        projectsService.getProjectUsers({ projectGuid: $scope.projectGuid }).then(function (data) {
            $scope.projectUsers = data;
        });

        projectsService.getPendingInvitations({ projectGuid: $scope.projectGuid }).then(function (data) {
            $scope.pendingInvitations = data;
        });
    }


    $scope.onSubmit = function () {
        projectsService.updateProject({
            projectGuid: $scope.projectGuid,
            payload: {
                description: $scope.project.description
            }
        }).then(function () {
            globalService.displayToast({
                messageText: "Project was successfully updated.",
                messageType: "success"
            });
        });
    }

    $scope.onFormElementChange = function (fieldId) {
        $rootScope.formElementsErrors[fieldId] = "";
    };
}

projectsModule.controller('ProjectDetailsCtrl', ProjectDetailsCtrl);

