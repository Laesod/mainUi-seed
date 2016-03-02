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
   
   service.getEntries = function (urlParams) {
      return globalService.request({
         method: "GET",
         url: apiUrl.apiEntryGetEntriesUrl,
         params: urlParams
      });
   };   
   
   return service;
}

entriesModule.service('entriesService', entriesService);