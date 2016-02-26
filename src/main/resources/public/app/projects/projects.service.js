'use strict';

var projectsModule = require('./_index.js');

function projectsService($q, $http, $cookies, APP_SETTINGS, globalService) {
   var apiUrl = APP_SETTINGS.apiUrl;
   var service = {};

   service.getProject = function (params) {
      return globalService.request({
         method: "GET",
         url: apiUrl.apiGatewayGetProjectUrl + "/" + params.projectGuid
      });
   }

   service.updateProject = function (params) {
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiGatewayUpdateProjectUrl + "/" + params.projectGuid,
         data: params.payload
      });
   }

   service.getProjects = function () {
      return globalService.request({
         method: "GET",
         url: apiUrl.apiGatewayGetProjectsUrl
      });
   }
   
   service.getProjectUsers = function (params) {
      return globalService.request({
         method: "GET",
         url: apiUrl.apiGatewayGetProjectUsersUrl + "/" + params.projectGuid,
      });
   }   
   
   service.getPendingInvitations = function (params) {
      return globalService.request({
         method: "GET",
         url: apiUrl.apiGatewayGetPendingInvitationsUrl + "?projectGuid=" + params.projectGuid,
      });
   }    

   service.createProject = function (payload) {
      return globalService.request({
         method: "POST",
         url: apiUrl.apiGatewayCreateProjectUrl,
         data: payload
      });
   }
   
   service.getProjectRoles = function(params){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiGatewayGetProjectRolesUrl + "/" + params.projectGuid,
         data: params.payload
      });       
   }
   
   service.getProjectGroups = function(params){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiGatewayGetProjectGroupsUrl + "/" + params.projectGuid,
         data: params.payload
      });       
   }   
   
   service.createInvitation = function(payload){
      return globalService.request({
         method: "POST",
         url: apiUrl.apiGatewayCreateInvitationUrl,
         data: payload
      });       
   }
   
   service.getReceivedInvitations = function(){
      return globalService.request({
         method: "GET",
         url: apiUrl.apiGatewayGetReceivedInvitationsUrl
      });         
   }
   
   service.acceptInvitation = function(invitationGuid){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiGatewayAcceptInvitationUrl + "/" + invitationGuid
      });         
   }   
   
   service.declineInvitation = function(invitationGuid){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiGatewayDeclineInvitationUrl + "/" + invitationGuid
      });         
   }   
   
   service.removeUserFromProject = function(params){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiGatewayRemoveUserFromProjectUrl + "/" + params.projectGuid + "?username=" + params.username
      });          
   }  
   
   service.updateUserRolesForProject = function(params){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiGatewayUpdateUserRolesForProjectUrl + "/" + params.projectGuid + "?username=" + params.username,
         data: params.payload
      });       
   }
   
   service.updateUserGroupsForProject = function(params){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiGatewayUpdateUserGroupsForProjectUrl + "/" + params.projectGuid + "?username=" + params.username,
         data: params.payload
      });       
   }   
   
   service.updateUserRolesAndGroupsForProject = function(params){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiGatewayUpdateUserRolesAndGroupsForProjectUrl + "/" + params.projectGuid + "?username=" + params.username,
         data: params.payload
      });       
   }
   
   return service;
}

projectsModule.service('projectsService', projectsService);