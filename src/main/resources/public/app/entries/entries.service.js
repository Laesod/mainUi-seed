'use strict';

var entriesModule = require('./_index.js');

function entriesService($q, $http, $cookies, APP_SETTINGS, globalService) {
   var apiUrl = APP_SETTINGS.apiUrl;
   var service = {};

   service.getEntryTypesForProject = function(params){
      return globalService.request({
         method: "GET",
         url: apiUrl.apiEntryGetEntryTypesForProjectUrl + "?projectGuid=" + params.projectGuid,
      });       
   }
   service.getEntryStatuses = function(params){
      return globalService.request({
         method: "GET",
         url: apiUrl.apiEntryGetEntryStatusesUrl + "?entryType=" + params.entryType,
      });        
   }
   
   service.createEntry = function(payload){
      return globalService.request({
         method: "POST",
         url: apiUrl.apiEntryCreateEntryUrl,
         data: payload
      });        
   }
   
   service.updateEntry = function(payload){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiEntryUpdateEntryUrl,
         data: payload
      });       
   }
   
   service.createDeficiencyDetails = function(payload){
      return globalService.request({
         method: "POST",
         url: apiUrl.apiEntryCreateDeficiencyDetailsUrl,
         data: payload
      });        
   }
   
   service.updateDeficiencyDetails = function(payload){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiEntryUpdateDeficiencyDetailsUrl,
         data: payload
      });       
   }   
   
   service.getEntries = function (params) {
      return globalService.request({
         method: "GET",
         url: apiUrl.apiEntryGetEntriesUrl,
         params: params.urlParams
      });
   };   
   
   service.getEntry = function (params) {
      return globalService.request({
         method: "GET",
         url: apiUrl.apiEntryGetEntryUrl + '/' + params.entryGuid,
      });
   };  
   
   service.getContactTypes = function () {
      return globalService.request({
         method: "GET",
         url: apiUrl.apiEntryGetContactTypesUrl,
      });
   };   
   
   service.createContactDetails = function(payload){
      return globalService.request({
         method: "POST",
         url: apiUrl.apiEntryCreateContactDetailsUrl,
         data: payload
      });        
   }   
   
   service.updateContactDetails = function(payload){
      return globalService.request({
         method: "PUT",
         url: apiUrl.apiEntryUpdateContactDetailsUrl,
         data: payload
      });       
   }       
   
   return service;
}

entriesModule.service('entriesService', entriesService);