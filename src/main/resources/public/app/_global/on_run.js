'use strict';

function OnRun($rootScope, $http, $state, $cookies, $window, globalService, APP_SETTINGS) {
    $rootScope.userProfile = angular.copy(APP_SETTINGS.userProfile);
    if($rootScope.userProfile.userProjects && $rootScope.userProfile.userProjects.length > 0){
        $rootScope.currentProjectGuid = $rootScope.userProfile.userProjects[0].projectGuid;        
    }
    
    $rootScope.entriesFilter = {entryTypeGuid: '1'};    
    
    $rootScope.checkPermissions = function(projectGuid, roles){
        return globalService.checkPermissions(projectGuid, roles);
    }
    

    $rootScope.formElementsErrors = {};

    $rootScope.onFormElementChange = function (fieldId) {
        $rootScope.formElementsErrors[fieldId] = "";
    };

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
