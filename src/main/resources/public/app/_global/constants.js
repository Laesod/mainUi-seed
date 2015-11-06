'use strict';

var AppSettings = function(config) {
    var apiGatewayBaseUrl = 'http://' + config.gatewayHost + ":" + config.gatewayPort;

    return {
        appTitle: 'conspector',
        apiUrl: {
            authUrl: apiGatewayBaseUrl + '/gateway',
            apiGatewayGetUserProfileUrl: apiGatewayBaseUrl + '/gateway/user',
            apiGatewayLogoutUrl: apiGatewayBaseUrl + "/gateway/logout"
        },
    };
};

module.exports = AppSettings;