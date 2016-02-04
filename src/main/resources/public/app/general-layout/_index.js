'use strict';

var bulk = require('bulk-require');

module.exports = angular.module('generalLayout', []);

angular.module("generalLayout").config(function ($stateProvider) {
   $stateProvider
      .state('app', {
         url: '',
         abstract: true,
         controller: 'GeneralLayoutCtrl',
         templateUrl: "views/general-layout.html",
         title: 'My Documents'
      });
});

angular.module("generalLayout").controller("ToastCtrl", function ($scope, $rootScope, $mdToast) {
   $scope.messageText = $rootScope.toastMessageText;
   $scope.messageType = $rootScope.toastMessageType;
});

bulk(__dirname, ['./**/!(*_index|*.spec).js']);