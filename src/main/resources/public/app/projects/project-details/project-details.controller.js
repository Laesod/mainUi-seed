'use strict';

var projectsModule = require('../_index');
var url = require('url');

function ProjectDetailsCtrl($scope, $state, $rootScope, $stateParams, $q, $timeout, $http, APP_SETTINGS, globalService, $window, projectsService) {
    var initCreateInvitationForm = function() {
        $scope.invitation = {
            email: "",
            roles: [],
            groups: [],
            groupSearchText: "",
            rouleSearchText: "",
        }
    }

   var getProjectRoles = function() {
        projectsService.getProjectRoles({ projectGuid: $rootScope.currentProjectGuid }).then(function(projectRoles) {
            $scope.projectRoles = projectRoles;
        });
    };

    var getProjectGroups = function() {
        projectsService.getProjectGroups({ projectGuid: $rootScope.currentProjectGuid }).then(function(projectGroups) {
            $scope.projectGroups = projectGroups;
        });
    };

    var getPendingInvitations = function() {
        projectsService.getPendingInvitations({ projectGuid: $scope.projectGuid }).then(function(data) {
            $scope.pendingInvitations = data;

            _.forEach($scope.pendingInvitations, function(invitation) {
                if (invitation.creatorAvatar) {
                    globalService.generatePresignedUrlForS3(invitation.creatorAvatar).then(function(data) {
                        invitation.creatorAvatarUrl = data.presignedUrl;
                    });
                } else {
                    invitation.creatorAvatarUrl = "https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg";
                }
            });
        });
    }

    var init = function() {
        $scope.projectGuid = $stateParams.projectGuid;
        initCreateInvitationForm();

        projectsService.getProject({ projectGuid: $scope.projectGuid }).then(function(data) {
            $scope.project = data;
        });

        if ($rootScope.checkPermissions($scope.projectGuid, ['admin'])) {
            projectsService.getProjectUsers({ projectGuid: $scope.projectGuid }).then(function(data) {
                $scope.projectUsers = data;
                $scope.projectUsersCopy = angular.copy($scope.projectUsers);

                _.forEach($scope.projectUsers, function(user) {
                    if (user.avatar) {
                        globalService.generatePresignedUrlForS3(user.avatar).then(function(data) {
                            user.avatarUrl = data.presignedUrl;
                        });
                    } else {
                        user.avatarUrl = "https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg";
                    }
                });
            });

            getProjectRoles();
            getProjectGroups();
            getPendingInvitations();
        }
    }
    
    init();

    $scope.searchProjectRole = function(roleSearchText) {
        return _.filter($scope.projectRoles, function(role) {
            return role.roleName.indexOf(roleSearchText) > -1;
        })
    };
    
    $scope.searchProjectGroup = function(groupSearchText) {
        return _.filter($scope.projectGroups, function(group) {
            return group.groupName.indexOf(groupSearchText) > -1;
        })
    }     

    $scope.onSubmitProjectChanges = function() {
        projectsService.updateProject({
            projectGuid: $scope.projectGuid,
            payload: {
                description: $scope.project.description,
                markedAsDeleted: $scope.project.markedAsDeleted === true ? true : false,
            }
        }).then(function() {
            globalService.displayToast({
                messageText: "Project was successfully updated.",
                messageType: "success"
            });
        });
    }

    $scope.onChangeAssignedUserRolesAndGroups = function(index) {
        var rolesIds = []
        _.forEach($scope.projectUsers[index].roles, function(role) {
            rolesIds.push(role.roleGuid);
        });

        var groupsIds = []
        var groupsToCreateAndAdd = []
        _.forEach($scope.projectUsers[index].groups, function(group) {
            if (group.groupGuid) {
                groupsIds.push(group.groupGuid);
            } else {
                groupsToCreateAndAdd.push({ groupName: group.groupName })
            }

        });

        projectsService.updateUserRolesAndGroupsForProject({
            projectGuid: $scope.projectGuid,
            username: $scope.projectUsers[index].username,
            payload: {
                roles: rolesIds,
                groups: groupsIds,
                groupsToCreateAndAdd: groupsToCreateAndAdd
            }
        }).then(function(updatedUserProject) {
            if ($scope.projectUsers[index].username === $rootScope.userProfile.username) {
                var userProject = _.find($rootScope.userProfile.userProjects, function(item) {
                    return item.projectGuid === $scope.projectGuid;
                });
                userProject.roles = updatedUserProject.roles;
                userProject.groups = updatedUserProject.groups;
            }

            globalService.displayToast({
                messageText: "Roles and groups assignments have been changed.",
                messageType: "success"
            });
        }, function() {
            $scope.projectUsers[index] = angular.copy($scope.projectUsersCopy[index]);
        });
    }

    $scope.onUnassignUser = function(index) {
        projectsService.removeUserFromProject({ projectGuid: $scope.projectGuid, username: $scope.projectUsers[index].username }).then(function() {
            globalService.displayToast({
                messageText: "User has been unassigned from the project.",
                messageType: "success"
            });
            $scope.projectUsers.splice(index, 1);
        });
    }

    $scope.onSendInvitation = function() {
        var rolesToAdd = [];
        var groupsToAdd = [];
        var groupsToCreateAndAdd = [];

        _.forEach($scope.invitation.roles, function(role) {
            if (role.roleGuid) {
                rolesToAdd.push(role.roleGuid);
            }
        });
        _.forEach($scope.invitation.groups, function(group) {
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
        }).then(function(createdInvitation) {
            globalService.displayToast({
                messageText: "Invitation was successfully created.",
                messageType: "success"
            });

            if (createdInvitation.creatorAvatar) {
                globalService.generatePresignedUrlForS3(createdInvitation.creatorAvatar).then(function(data) {
                    createdInvitation.creatorAvatarUrl = data.presignedUrl;
                });
            } else {
                createdInvitation.creatorAvatarUrl = "https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg";
            }

            $scope.pendingInvitations.push(createdInvitation)
            initCreateInvitationForm();
            getProjectGroups();
        });
    };

    $scope.transformGroupChip = function(groupChip) {
        if (angular.isObject(groupChip)) {
            return groupChip;
        }
        return { groupName: groupChip }
    }

    $scope.onBack = function() {
        $state.go("app.projectsList");
    }

    $scope.onRefresh = function() {
        init();
    }
    
    $scope.onAdd = function() {
        $state.go("app.projectNew");
    }    
}

projectsModule.controller('ProjectDetailsCtrl', ProjectDetailsCtrl);

