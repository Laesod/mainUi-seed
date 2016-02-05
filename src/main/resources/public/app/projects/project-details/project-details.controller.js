'use strict';

var projectsModule = require('../_index');
var url = require('url');

function ProjectDetailsCtrl($scope, $rootScope, $stateParams, $timeout, $http, APP_SETTINGS, globalService, $window, projectsService) {
   $scope.projectGuid = $stateParams.projectGuid;

   projectsService.getProject({ projectGuid: $scope.projectGuid }).then(function (data) {
      $scope.project = data;
   });

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
   
    $scope.onFormElementChange = function(fieldId) {
        $rootScope.formElementsErrors[fieldId] = "";
    };    
}

projectsModule.controller('ProjectDetailsCtrl', ProjectDetailsCtrl);

