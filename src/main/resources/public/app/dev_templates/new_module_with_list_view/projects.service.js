'use strict';

var projectsModule = require('./_index.js');

function projectsService($q, $http, $cookies, APP_SETTINGS, globalService) {
   var apiUrl = APP_SETTINGS.apiUrl;
   var service = {};

   return service;
}

projectsModule.service('projectsService', projectsService);