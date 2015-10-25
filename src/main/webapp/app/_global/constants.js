'use strict';

var AppSettings = function() {
    var authBaseUrl = 'http://localhost:2000';
    var apiGatewayBaseUrl = 'http://localhost:2000';

    return {
        appTitle: 'conspector',
        authUrl: authBaseUrl,
        apiGatewayGetUserProfileUrl: apiGatewayBaseUrl + '/user',
        apiGatewayLogoutUrl: apiGatewayBaseUrl + "/logout"
    };
};

module.exports = AppSettings;