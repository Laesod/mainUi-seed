'use strict';

function OnRun($rootScope, $http, $state, $cookies, $window, globalService) {
   $rootScope.formElementsErrors = {};

   $rootScope.safeApply = function (fn) {
      var phase = $rootScope.$$phase;

      if (phase === '$apply' || phase === '$digest') {
         if (fn && (typeof (fn) === 'function')) {
            fn();
         }
      } else {
         this.$apply(fn);
      }
   };

   function onStateChangeStart(evt, toState, params) {
      $rootScope.formElementsErrors = {}; //cleaning form elements error messages       
   }

   function onStateChangeSuccess(evt, toState, toParams, fromState, fromParams) {
   }

   $rootScope.$on('$stateChangeStart', onStateChangeStart);
   $rootScope.$on('$stateChangeSuccess', onStateChangeSuccess);
}

module.exports = OnRun;
