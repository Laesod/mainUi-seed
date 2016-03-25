'use strict';

var projectsModule = require('../_index');
var url = require('url');

function ProjectsListCtrl($rootScope, $scope, $timeout, projectsService, $state) {
    var init = function() {
        $scope.showBusyIndicator = true;
        projectsService.getProjects().then(function(data) {
            $scope.projects = data;

            if ($rootScope.currentProjectGuid) {
                _.find($scope.projects, { projectGuid: $rootScope.currentProjectGuid })._isCurrent = true;
            }
            $timeout(function() {
                $scope.showBusyIndicator = false;
            }, 200);
        });
    }

    init();

    $scope.onEdit = function(index) {
        $state.go("app.projectDetails", { projectGuid: $scope.projects[index].projectGuid });
    }

    $scope.onAdd = function() {
        $state.go("app.projectNew");
    }

    $scope.onChangeCurrent = function(index) {
        var projectGuid = $scope.projects[index].projectGuid;
        _.forEach($scope.projects, function(project) {
            if (projectGuid !== project.projectGuid) {
                project._isCurrent = false;
            }
        });
        $rootScope.currentProjectGuid = projectGuid;
    }

    $scope.onRefresh = function() {
        init();
    }
}

projectsModule.controller('ProjectsListCtrl', ProjectsListCtrl);

