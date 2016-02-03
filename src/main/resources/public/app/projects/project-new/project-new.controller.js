'use strict';

var projectsModule = require('../_index');
var url = require('url');

function ProjectNewCtrl($scope, $rootScope, $state, globalService, projectsService) {
   $scope.project = {};

   $scope.onCreate = function () {
      projectsService.createProject($scope.project).then(function () {
         $state.go("app.projectsList");
         globalService.displayToast({
            messageText: "New project has been added.",
            messageType: "success"
         });
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
}

projectsModule.controller('ProjectNewCtrl', ProjectNewCtrl);

