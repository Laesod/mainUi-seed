'use strict';

var projectsModule = require('../_index');
var url = require('url');

function ProjectDetailsCtrl($scope, $rootScope, $stateParams, $q, $timeout, $http, APP_SETTINGS, globalService, $window, projectsService) {
    $scope.projectGuid = $stateParams.projectGuid;

    var initCreateInvitationForm = function () {
        $scope.invitation = {
            email: "",
            roles: [],
            groups: []
        }
    }

    initCreateInvitationForm();
    
    $scope.getPossibleRoles = function (query, currentRoles) {
        return projectsService.getProjectRoles({ projectGuid: $scope.projectGuid, payload: { nameContains: query, currentRoles: currentRoles } });
    };

    $scope.getPossibleGroups = function (query, currentGroups) {
        return projectsService.getProjectGroups({ projectGuid: $scope.projectGuid, payload: { nameContains: query, currentGroups: currentGroups } });
    };

    $scope.isAdmin = globalService.checkPermissions($scope.projectGuid, ["admin"]);

    projectsService.getProject({ projectGuid: $scope.projectGuid }).then(function (data) {
        $scope.project = data;
    });

    var getPendingInvitations = function () {
        projectsService.getPendingInvitations({ projectGuid: $scope.projectGuid }).then(function (data) {
            $scope.pendingInvitations = data;
        });
    }

    if ($scope.isAdmin) {
        projectsService.getProjectUsers({ projectGuid: $scope.projectGuid }).then(function (data) {
            $scope.projectUsers = data;
        });

        getPendingInvitations();
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

    $scope.onSendInvitation = function () {
        var rolesToAdd = [];
        var groupsToAdd = [];
        var groupsToCreateAndAdd = [];

        _.forEach($scope.invitation.roles, function (role) {
            if (role.roleGuid) {
                rolesToAdd.push(role.roleGuid);
            }
        });
        _.forEach($scope.invitation.groups, function (group) {
            if (group.groupGuid) {
                groupsToAdd.push(group.groupGuid);
            } else {
                groupsToCreateAndAdd.push({ groupName: group.groupName });
            }
        });

        projectsService.createInvitation({
            projectGuid: $scope.projectGuid,
            email: $scope.invitation.email,
            rolesToAdd: rolesToAdd,
            groupsToAdd: groupsToAdd,
            groupsToCreateAndAdd: groupsToCreateAndAdd
        }).then(function () {
            globalService.displayToast({
                messageText: "Invitation was successfully created.",
                messageType: "success"
            });

            getPendingInvitations();
            initCreateInvitationForm();
        });;
    };

    $scope.onFormElementChange = function (fieldId) {
        $rootScope.formElementsErrors[fieldId] = "";
    };
}

projectsModule.controller('ProjectDetailsCtrl', ProjectDetailsCtrl);

