'use strict';

var projectsModule = require('../_index');
var url = require('url');

function ProjectNewCtrl($scope, $rootScope, $state, globalService, projectsService, APP_SETTINGS) {
    $scope.project = {entryTypesToAdd: []};

    var getEntryTypes = function() {
        var entryTypesPromise = projectsService.getEntryTypes();
        entryTypesPromise.then(function(receivedEntryTypes) {
            $scope.entryTypes = receivedEntryTypes;

            _.forEach($scope.entryTypes, function(entryType) {
                entryType.enabled = true;
            });
        });
    }

    getEntryTypes();

    $scope.onCreate = function() {
        _.forEach($scope.entryTypes, function(entryType) {
            if(entryType.enabled){
                $scope.project.entryTypesToAdd.push(entryType.entryTypeGuid);
            }
        });

        projectsService.createProject($scope.project).then(function(createdProject) {
            $state.go("app.projectsList");
            globalService.displayToast({
                messageText: "New project has been added.",
                messageType: "success"
            });

            $rootScope.userProfile.userProjects.push(createdProject);
        });
    }

    $scope.onKeyPress = function(event) {
        if (event.keyCode === 13) {
            $scope.onCreate();
        }
    };

    $scope.onFormElementChange = function(fieldId) {
        $rootScope.formElementsErrors[fieldId] = "";
    };

    $scope.onBack = function() {
        $state.go("app.projectsList");
    }
}

projectsModule.controller('ProjectNewCtrl', ProjectNewCtrl);

