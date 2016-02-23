'use strict';

var projectsModule = require('../_index');
var url = require('url');

function ReceivedInvitationsCtrl($scope, $rootScope, projectsService, globalService, $state) {
    projectsService.getReceivedInvitations().then(function (invitationsList) {
        $scope.receivedInvitations = invitationsList;
    })

    $scope.onAccept = function (index) {
        projectsService.acceptInvitation($scope.receivedInvitations[index].invitationGuid).then(function (acceptedProject) {
            globalService.displayToast({
                messageText: "Invitation has been accepted.",
                messageType: "success"
            });
            $rootScope.userProfile.userProjects.push(acceptedProject);
            $scope.receivedInvitations.splice(index, 1);
        })
    }

    $scope.onDecline = function (index) {
        projectsService.declineInvitation($scope.receivedInvitations[index].invitationGuid).then(function () {
            globalService.displayToast({
                messageText: "Invitation has been declined.",
                messageType: "success"
            });
            $scope.receivedInvitations.splice(index, 1);
        })
    }
}

projectsModule.controller('ReceivedInvitationsCtrl', ReceivedInvitationsCtrl);

