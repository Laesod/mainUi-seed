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

   return service;
}

entriesModule.service('entriesService', entriesService);