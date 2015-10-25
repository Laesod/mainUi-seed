'use strict';

require('../general-layout/_index');
require('../documents/_index');

var app = require('./_index'),
    injector = angular.injector,
    constants = require('./constants'),
    appSettings = constants(),
    http,
    q;

function redirectToAuth() {
    window.location = appSettings.authUrl + '/#/login?location=' + encodeURIComponent(window.location.href);
}

function checkAuthentication() {
    var deferred = q.defer();
    http.get(appSettings.apiGatewayGetUserProfileUrl + '?' + new Date().getTime(), {withCredentials: true}).
        success(function (response) {
            if (response.authenticated) {
                deferred.resolve(true);
            } else {
                deferred.resolve(false);
            }
        });

    return deferred.promise;
}

function onDocumentReady() {
    injector = injector(['app']);
    http = injector.get('$http');
    q = injector.get('$q');

    checkAuthentication().then(function(isUserAuthenticated){
        if(isUserAuthenticated){
            createApp();
        }else{
            redirectToAuth();
        }
    });
}

angular.element(document).ready(onDocumentReady);

function createApp() {
    app.constant('APP_SETTINGS', appSettings);
    app.config(require('./on_config'));
    angular.bootstrap(document, ['app']);
}
