'use strict';

var tasksModule = require('./_index.js');

function tasksService($q, $http, $cookies, APP_SETTINGS, globalService) {
    var apiUrl = APP_SETTINGS.apiUrl;
    var service = {};

    service.createTask = function(parameters) {
        return globalService.request({
            method: "POST",
            url: apiUrl.tasksManagementCreateTaskUrl,
            data: parameters.payload
        });
    };

    service.changeTask = function(parameters) {
        return globalService.request({
            method: "PUT",
            url: apiUrl.tasksManagementChangeTaskUrl + '/' + parameters.guid,
            data: parameters.payload
        });
    };

    service.deleteTask = function(parameters) {
        return globalService.request({
            method: "DELETE",
            url: apiUrl.tasksManagementDeleteTaskUrl + '/' + parameters.guid,
        });
    };

    service.getTasks = function(urlParams) {
        return globalService.request({
            method: "GET",
            url: apiUrl.tasksManagementGetTasksUrl,
            params: urlParams
        });
    };

    return service;
}

tasksModule.service('tasksService', tasksService);