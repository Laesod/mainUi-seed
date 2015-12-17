'use strict';

module.exports = angular.module('globals', []);

function globalService($rootScope, $http, $q, $cookies, $timeout, APP_SETTINGS, $mdToast, Upload) {
    var service = {};

    service.request = function(params) {
        var deferred = $q.defer();
        params.withCredentials = true;

        $http(params).
        success(function(data) {
            deferred.resolve(data);
        }).
        error(function(err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    service.logout = function() {
        var deferred = $q.defer();
        var url = APP_SETTINGS.apiUrl.apiGatewayLogoutUrl;

        $http.get(url, {
            withCredentials: true
        }).
        success(function(data) {
            deferred.resolve(data);
        }).
        error(function(err, status) {
            deferred.reject(err);
        });

        return deferred.promise;
    };

    service.fileUploadToS3 = function(file, guid){
       // var keyGuid = this.generateGuid();
        if (file) {
            file.upload = Upload.upload({ //to be moved to global services...
                url: APP_SETTINGS.s3AccessInfo.s3UploadUrl,
                withCredentials : false,                
                data: {
                    key: guid, //"test",
                    AWSAccessKeyId: APP_SETTINGS.s3AccessInfo.s3AccessKeyId,
                    acl: 'private',
                    policy: APP_SETTINGS.s3AccessInfo.s3Policy,
                    signature: APP_SETTINGS.s3AccessInfo.s3Signature,
                    "Content-Type": file.type !== '' ? file.type : 'application/octet-stream', 
                    filename: file.name,
                    file: file,
                }
            });

            return file.upload;

            // file.upload.then(function (response) {
            //     //keyGuid to be passed to metadata
            //     $timeout(function () {
            //         file.result = response.data;
            //     });
            // }, function (response) {
            //     // if (response.status > 0)
            //     //     $scope.errorMsg = response.status + ': ' + response.data;
            // }, function (evt) {
            //     file.progress = Math.min(100, parseInt(100.0 * 
            //                              evt.loaded / evt.total));
            // });
        }   
    };

    service.generatePresignedUrlForS3 = function(s3ObjectKey){
        return this.request({
            method: "GET",
            url: APP_SETTINGS.apiUrl.filesManagementGeneratePresignedUrlForS3,
            params: {s3ObjectKey: s3ObjectKey}
        });        
    };

    service.displayToast = function(parameters) {
        var templateUrl = APP_SETTINGS.contextPrefix + "/templates/toast-template.html";

        $rootScope.toastMessageText = [parameters.messageText];
        $rootScope.toastMessageType = parameters.messageType;

        var oToast = {
            controller: "ToastCtrl",
            templateUrl: templateUrl,
            hideDelay: 3000,
            position: "top right"
        };

        $mdToast.show(oToast);
    };

    service.generateGuid = function(){
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + '-' + s4() + '-' + s4();        
    };

    return service;
}

module.exports.service('globalService', globalService);