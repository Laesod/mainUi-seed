'use strict';

var documentsModule = require('../_index');
var url = require('url');

function ProfileDetailsCtrl($scope, $http, APP_SETTINGS, globalService, $window, $timeout, Upload, profileService) {
   $scope.avatarUrl = "";
   if (APP_SETTINGS.userProfile.avatarS3ObjectKey) {
      globalService.generatePresignedUrlForS3(APP_SETTINGS.userProfile.avatarS3ObjectKey).then(function (data) {
         $scope.avatarUrl = data.presignedUrl;
      });
   } else {
      $scope.avatarUrl = "https://farm4.staticflickr.com/3261/2801924702_ffbdeda927_d.jpg";
   }

   function sendFile(file, dataURL, guid) {
      globalService.fileUploadToS3(file, dataURL, guid).then(function (data) {
         profileService.changeAvatar({ avatarS3ObjectKey: guid }).then(function () {
            globalService.generatePresignedUrlForS3(guid).then(function (data) {
               $scope.avatarUrl = data.presignedUrl;
            });
         });
      });
   }

   $scope.onUpload = function () {
      var guid = globalService.generateGuid();

      globalService.preprocessImg($scope.file, guid).then(function (dataURL) { sendFile($scope.file, dataURL, guid) })
   };
}

documentsModule.controller('ProfileDetailsCtrl', ProfileDetailsCtrl);