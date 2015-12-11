'use strict';

describe('Unit: TasksListCtrl', function() {

    var ctrl, scope, stateName, globalService, tasksService, $window, stateParams, deferred, rootScope, APP_SETTINGS;

    beforeEach(module('app'));

    beforeEach(inject(function($state) {
        spyOn($state, "go").andCallFake(function(state, params) {
            stateName = state;
            stateParams = params;
        });
    }));

    beforeEach(inject(function($controller, $rootScope, _APP_SETTINGS_, _globalService_, _tasksService_, _$window_, _$q_) {
        APP_SETTINGS = _APP_SETTINGS_;

        ctrl = $controller('TasksListCtrl', {
            $scope: scope,
            tasksService: _tasksService_,
            APP_SETTINGS: APP_SETTINGS
        });
    }));

    it('test', function() {
        expect(true).toBeTruthy();
    });
});