'use strict';

require('../general-layout/_index');
require('../tasks/_index');
require('../projects/_index');
require('../profile/_index');

var injector = angular.injector,
    app = require('./_index'),
    constants = require('./constants'),
    APP_SETTINGS,
    http,
    q,
    cookies;

var constants = require('./constants');
var contextParams = require('./context-params');

function redirectToAuth() {
    window.location = APP_SETTINGS.apiUrl.authUrl + '/#/login?location=' + encodeURIComponent(window.location.href);
}

function checkAuthentication() {
    var deferred = q.defer();
    http.get(APP_SETTINGS.apiUrl.apiGatewayGetUserProfileUrl, {
        withCredentials: true
    }).
        success(function (response) {
            if (response.username) {
                APP_SETTINGS.userProfile = response;
            
                //faking response...
                // _.forEach(APP_SETTINGS.userProfile.userProjects, function(userProject){
                //     userProject.roles = [{roleName: "manager"}];
                // })

                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        });

    return deferred.promise;
}

function onDocumentReady() {
    angular.module('dummy_module', ['ngCookies']); //ngCookies includes core module 'ng', so $http and $q will be available as well
    injector = injector(['dummy_module']);

    http = injector.get('$http');
    q = injector.get('$q');
    cookies = injector.get('$cookies');

    var appLanguage = cookies.get('appLanguage');
    http.get(contextParams.configServicePrefix() + 'mainUi/config?' + new Date().getTime()).
        success(function (response) {
            APP_SETTINGS = constants(response);

            if (appLanguage) {
                APP_SETTINGS.appLanguage = appLanguage;
            }

            //createApp();
             checkAuthentication().then(function (isUserAuthenticated) {
                if (isUserAuthenticated) {
                   createApp();
                } else {
                   redirectToAuth();
                }
             });
        }).error(function () {

        });
}

angular.element(document).ready(onDocumentReady);

function createApp() {
    app.constant('APP_SETTINGS', APP_SETTINGS);
    app.config(require('./on_config'));
    app.run(require('./on_run'));

    angular.bootstrap(document, ['app']);
}