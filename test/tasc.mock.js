'use strict';

window.tascMock = {
    services: {
        $http: {
            get: function() {
                return {
                    success: function(fn) {
                        fn();

                        return {
                            error: function(fn) {
                                // fn(); //do nothing
                            }
                        };
                    }
                }
            }
        },

        $cookies: {
            get: function() {
                var cookie = {
                    tokenId: "1441122623305|0000-0000-0001|superuser",
                    tascId: "0000-0000-0001",
                    type: null,
                    successUrl: null,
                    errorMessage: null,
                    roles: [],
                    validUser: true
                };

                return JSON.stringify(cookie);
            }
        }
    },

    injector: function() {
        return {
            get: function(serviceName) {
                return window.tascMock.services[serviceName];
            }
        };
    }
};