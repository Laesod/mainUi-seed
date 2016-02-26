'use strict';

var profileModule = require('./_index.js');

function profileService($q, $http, Upload, $cookies, APP_SETTINGS, globalService) {
    var apiUrl = APP_SETTINGS.apiUrl;
    var service = {};

    service.changeAvatar = function(parameters) {
        return globalService.request({
            method: "PUT",
            url: apiUrl.changeAvatarUrl + '?s3ObjectKey=' + parameters.avatarS3ObjectKey,
        });
    };
    
    service.changePassword = function(payload){
        return globalService.request({
            method: "PUT",
            url: apiUrl.changePasswordUrl,
            data: payload
        });        
    }

    return service;
}

profileModule.service('profileService', profileService);
