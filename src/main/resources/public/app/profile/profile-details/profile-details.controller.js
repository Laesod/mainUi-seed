'use strict';

var documentsModule = require('../_index');
var url = require('url');

function ProfileDetailsCtrl($scope, $rootScope, $http, APP_SETTINGS, globalService, $window, $timeout, Upload, profileService) {
    $scope.avatarUrl = "";
    $scope.changePassword = {
        currentPassword: "",
        newPassword: ""
    }
    
    if ($rootScope.userProfile.avatarS3ObjectKey) {
        globalService.generatePresignedUrlForS3($rootScope.userProfile.avatarS3ObjectKey).then(function (data) {
            $scope.avatarUrl = data.presignedUrl;
        });
    } else {
        $scope.avatarUrl = "https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg";
    }

    function sendFile(file, dataURL, guid) {
        globalService.fileUploadToS3(file, dataURL, guid).then(function (data) {
            profileService.changeAvatar({ avatarS3ObjectKey: guid }).then(function () {
                $rootScope.userProfile.avatarS3ObjectKey = guid;
                globalService.generatePresignedUrlForS3(guid).then(function (data) {
                    $scope.avatarUrl = data.presignedUrl;
                });
            });
        });
    }

    $scope.onUpload = function () {
        var guid = globalService.generateGuid();

        globalService.preprocessImg($scope.file, guid).then(function (dataURL) { sendFile($scope.file, dataURL, guid) });
    };

    $scope.onChangeAvatar = function () {
        var uploadElement = document.getElementById("UploadInput");
        $timeout(function () {
            document.getElementById('UploadInput').click();
        }, 0);
    }

    $scope.onChangePassword = function () {
        profileService.changePassword($scope.changePassword).then(function () {
            globalService.displayToast({
                messageText: "Password has been successfully changed",
                messageType: "success"
            });
        });
    }
}

documentsModule.controller('ProfileDetailsCtrl', ProfileDetailsCtrl);