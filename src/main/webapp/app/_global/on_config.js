'use strict';

function OnConfig($urlRouterProvider, $httpProvider, $injector, APP_SETTINGS) {
    $urlRouterProvider.otherwise(function($injector) {
        var globalService = $injector.get('globalService');
        var state = $injector.get('$state');
        var stateName = "app.documentsList";
        state.go(stateName);
    });

     $httpProvider.interceptors.push(function($injector, $window, $cookies, $q) {
         return {
             'responseError': function(err, status) {
                 switch (err.status) {
                     case 401:
                         break;
                     case 403:
                         break;
                 }

                 return $q.reject(err);
             }
         };
     });
}

module.exports = OnConfig;
