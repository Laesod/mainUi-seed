'use strict';

var contextParams = require('./context-params');

var AppSettings = function(config) {
    var apiGatewayBaseUrl = 'http://' + config.gatewayHost + ":" + config.gatewayPort;

    return {
        appTitle: 'conspector',
        contextPrefix: contextParams.contextPrefix(), //'/gateway',        
        apiUrl: {
            authUrl: apiGatewayBaseUrl + '/gateway',
            apiGatewayGetUserProfileUrl: apiGatewayBaseUrl + '/gateway/user',
            apiGatewayLogoutUrl: apiGatewayBaseUrl + "/gateway/logout"
        },
    };
};

module.exports = AppSettings;