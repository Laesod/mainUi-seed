'use strict';

var projectsModule = require('./_index.js');

function projectsService($q, $http, $cookies, APP_SETTINGS, globalService) {
   var apiUrl = APP_SETTINGS.apiUrl;
   var service = {};
   
   service.getProjects = function(){
      return globalService.request({
         method: "GET",
         url: apiUrl.apiGatewayGetProjectsUrl
      });      
   }

   service.createProject = function(payload){
      return globalService.request({
         method: "POST",
         url: apiUrl.apiGatewayCreateProjectUrl,
         data: payload
      });       
   }
   return service;
}

projectsModule.service('projectsService', projectsService);