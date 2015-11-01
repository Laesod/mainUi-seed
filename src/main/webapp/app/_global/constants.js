'use strict';

var AppSettings = function() {
    var apiGatewayBaseUrl = 'http://localhost:2000';

    return {
        appTitle: 'conspector',
        authUrl: apiGatewayBaseUrl,
        apiGatewayGetUserProfileUrl: apiGatewayBaseUrl + '/user',
        apiGatewayLogoutUrl: apiGatewayBaseUrl + "/logout"
    };
};

module.exports = AppSettings;