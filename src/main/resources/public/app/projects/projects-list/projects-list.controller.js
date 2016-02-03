'use strict';

var projectsModule = require('../_index');
var url = require('url');

function ProjectsListCtrl($scope, projectsService, $state) {
   
   projectsService.getProjects().then(function(data){
      $scope.projects = data;
   })
   
   $scope.onEdit = function(){
      $state.go("app.projectDetails");
   }
   
   $scope.onAdd = function(){
      $state.go("app.projectNew");
   }   
}

projectsModule.controller('ProjectsListCtrl', ProjectsListCtrl);

