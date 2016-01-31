'use strict';

module.exports = angular.module('globals', []);

function globalService($rootScope, $http, $q, $cookies, $timeout, APP_SETTINGS, $mdToast, Upload, Blob) {
   var service = {};

   service.request = function (params) {
      var deferred = $q.defer();
      params.withCredentials = true;

      $http(params).
         success(function (data) {
            deferred.resolve(data);
         }).
         error(function (err, status) {
            deferred.reject(err);
         });

      return deferred.promise;
   };

   service.logout = function () {
      var deferred = $q.defer();
      var url = APP_SETTINGS.apiUrl.apiGatewayLogoutUrl;

      $http.get(url, {
         withCredentials: true
      }).
         success(function (data) {
            deferred.resolve(data);
         }).
         error(function (err, status) {
            deferred.reject(err);
         });

      return deferred.promise;
   };

   service.preprocessImg = function (file, guid) {
      var deferred = $q.defer();

      function processFile(file, dataURL) {
         var deferred = $q.defer();

         var maxWidth = 800;
         var maxHeight = 800;

         var image = new Image();
         image.src = dataURL;

         image.onload = function () {
            var width = image.width;
            var height = image.height;
            var shouldResize = (width > maxWidth) || (height > maxHeight);

            if (!shouldResize) {
               deferred.resolve(dataURL);
            }

            var newWidth;
            var newHeight;

            if (width > height) {
               newHeight = height * (maxWidth / width);
               newWidth = maxWidth;
            } else {
               newWidth = width * (maxHeight / height);
               newHeight = maxHeight;
            }

            var canvas = document.createElement('canvas');

            canvas.width = newWidth;
            canvas.height = newHeight;

            var context = canvas.getContext('2d');

            EXIF.getData(image, function () {
               var imgOrientation = EXIF(this).EXIFwrapped.exifdata.Orientation;

               switch (imgOrientation) {
                  case 2:
                     // horizontal flip
                     context.translate(canvas.width, 0);
                     context.scale(-1, 1);
                     break;
                  case 3:
                     // 180° rotate left
                     context.translate(canvas.width, canvas.height);
                     context.rotate(Math.PI);
                     break;
                  case 4:
                     // vertical flip
                     context.translate(0, canvas.height);
                     context.scale(1, -1);
                     break;
                  case 5:
                     // vertical flip + 90 rotate right
                     context.rotate(0.5 * Math.PI);
                     context.scale(1, -1);
                     break;
                  case 6:
                     // 90° rotate right
                     context.rotate(0.5 * Math.PI);

                     if (newWidth >= newHeight) {//prefaced a lot of manual tuning/playing...
                        var translationValue = (newWidth - newHeight) / 2;
                        context.translate(0, -(newHeight + translationValue));
                     }
                     else{
                        var translationValue = (newHeight - newWidth) / 2;
                        context.translate(0, -(newWidth + translationValue));
                     }

                     break;
                  case 7:
                     // horizontal flip + 90 rotate right
                     context.rotate(0.5 * Math.PI);
                     context.translate(canvas.width, -canvas.height);
                     context.scale(-1, 1);
                     break;
                  case 8:
                     // 90° rotate left
                     context.rotate(-0.5 * Math.PI);
                     context.translate(-canvas.width, 0);
                     break;
               }
            });

            context.drawImage(this, 0, 0, newWidth, newHeight);

            dataURL = canvas.toDataURL(file.type);

            deferred.resolve(dataURL);
         };

         return deferred.promise;
      };

      function readFile(file, guid) {
         var deferred = $q.defer();

         var reader = new FileReader();

         reader.onloadend = function () {
            processFile(file, reader.result).then(function (dataURL) { deferred.resolve(dataURL); });
         }

         reader.readAsDataURL(file);

         return deferred.promise;
      };

      readFile(file, guid).then(function (dataURL) { deferred.resolve(dataURL); })

      return deferred.promise;
   };

   service.fileUploadToS3 = function (file, dataURL, guid) {
      var dataURItoBlob = function (dataURI, dataTYPE) {
         var binary = atob(dataURI.split(',')[1]), array = [];
         for (var i = 0; i < binary.length; i++) array.push(binary.charCodeAt(i));
         return new Blob([new Uint8Array(array)], { type: dataTYPE });
      }

      var blob = dataURItoBlob(dataURL, file.type);

      if (file) {
         file.upload = Upload.upload({
            url: APP_SETTINGS.s3AccessInfo.s3UploadUrl,
            withCredentials: false,
            data: {
               key: guid,
               AWSAccessKeyId: APP_SETTINGS.s3AccessInfo.s3AccessKeyId,
               acl: 'private',
               policy: APP_SETTINGS.s3AccessInfo.s3Policy,
               signature: APP_SETTINGS.s3AccessInfo.s3Signature,
               "Content-Type": file.type,
               filename: file.name,
               file: blob
            }
         });

         return file.upload;
      }
   };

   service.generatePresignedUrlForS3 = function (s3ObjectKey) {
      return this.request({
         method: "GET",
         url: APP_SETTINGS.apiUrl.filesManagementGeneratePresignedUrlForS3,
         params: { s3ObjectKey: s3ObjectKey }
      });
   };

    service.displayToast = function (parameters) {
        var templateUrl = APP_SETTINGS.contextPrefix + "/templates/toast-template.html";
        
        $rootScope.toastMessageText = [parameters.messageText];
        $rootScope.toastMessageType = parameters.messageType;

        var oToast = {
            controller: "ToastCtrl",
            templateUrl: templateUrl, //"templates/toast-template.html",
            hideDelay: 3000,
            position: "top right"
        };

        $mdToast.show(oToast);
    };

   service.generateGuid = function () {
      function s4() {
         return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
      }
      return s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +
         s4() + '-' + s4() + '-' + s4() + '-' + s4();
   };

   service.objToUrlParamsString = function (obj, prefix) {
      var str = [];
      for (var p in obj) {
         if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix : p, v = obj[p];
            str.push(typeof v == "object" ? this.objToUrlParamsString(v, k) : k + "=" + v);
         }
      }
      return str.join("&");
   };

   return service;
}

module.exports.service('globalService', globalService);