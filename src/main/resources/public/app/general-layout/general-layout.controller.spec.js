'use strict';

describe('GeneralLayoutCtrl', function() {
    var ctrl, scope, state, cookies, $window, globalService;

    beforeEach(module('app'));

    $window = {
        location: {
            href: undefined,
            origin: undefined,
            hostname: "localhost"
        }
    };

    module(function($provide) {
        $provide.value('$window', $window);
    });

    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        state = {
            go: function() {}
        };
        cookies = {
            remove: function() {}
        };

        globalService = {
            xSessionToken: {},
            getLandingState: function() {}
        };

        ctrl = $controller('GeneralLayoutCtrl', {
            $scope: scope,
            $state: state,
            $cookies: cookies,
            $window: $window,
            globalService: globalService
        });
    }));

    it('should work', function() {
        expect(scope.test).toBeTruthy();
    });

    describe('Logout', function() {
        it('should have a logout method', function() {
            expect(scope.logout).toBeTruthy();
        });
        it('should remove X-TASC-USER-SESSION cookie', function() {
            spyOn(cookies, "remove");
            scope.logout();
            expect(cookies.remove).toHaveBeenCalled();
        });
        it('should remove clientTascId cookie', function() {
            spyOn(cookies, "remove");
            scope.logout();
            expect(cookies.remove).toHaveBeenCalledWith('clientTascId');
        });
        it('should work fine with window.location.port', function() {
            $window.location.port = 1234;
            scope.logout();
            expect($window.location.origin).toBeTruthy();
        });
        it('should work fine with window.location.origin not null', function() {
            $window.location.origin = 'http://localhost:8080';
            scope.logout();
            expect($window.location.origin).toBeTruthy();
        });
    });

    describe('onHome', function() {
        it('should go to home page', function() {
            spyOn(state, "go");
            scope.onHome();
            expect(state.go).toHaveBeenCalled();
        });
    });

});