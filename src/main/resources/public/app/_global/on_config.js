'use strict';

function OnConfig($urlRouterProvider, $httpProvider, $injector, APP_SETTINGS, $translateProvider) {
    // var cookies = $injector.get('$cookies');

    $urlRouterProvider.otherwise(function($injector) {
        var globalService = $injector.get('globalService');
        var state = $injector.get('$state');
        var stateName = "app.tasksList";
        state.go(stateName);
    });

    $httpProvider.defaults.withCredentials = true;

    $httpProvider.interceptors.push(function($injector, $window, $cookies, $q) {
        return {
            'responseError': function(err, status) {

                switch (err.status) {
                    case -1: //-1 is used instead of 401 because that's the status intercepted by angular in case of not authorize exception
                        window.location = APP_SETTINGS.apiUrl.authUrl + '/#/login?location=' + encodeURIComponent(window.location.href);
                        break;
                }

                return $q.reject(err);
            }
        };
    });

    $translateProvider.translations('en', {
        "logOut": "LOG OUT",
        "logedInAsMsg": "You are currently logged in as:",
        "logedInWithRolesMsg": "Your roles are:",
        "add": "Add",
        "settings": "Settings",
        "download": "Download"
    });

    $translateProvider.translations('fr', {
        "logOut": "LOG OUT (fr)",
        "logedInAsMsg": "You are currently logged in as: (fr)",
        "logedInWithRolesMsg": "Your roles are: (fr)"
    });

    if (APP_SETTINGS.appLanguage) {
        $translateProvider.use(APP_SETTINGS.appLanguage);
    }
}

module.exports = OnConfig;