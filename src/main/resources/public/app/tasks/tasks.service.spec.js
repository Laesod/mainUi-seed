'use strict';

describe('Unit: tasksService', function() {

    var APP_SETTINGS, httpBackend, tasksService, uploadCalled;

    beforeEach(module('app'));

    beforeEach(inject(function(_APP_SETTINGS_, _$httpBackend_, _tasksService_) {
        APP_SETTINGS = _APP_SETTINGS_;
        httpBackend = _$httpBackend_;
        tasksService = _tasksService_;

    }));
});