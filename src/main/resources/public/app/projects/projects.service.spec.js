'use strict';

describe('Unit: projectsService', function() {

    var APP_SETTINGS, httpBackend, projectsService;

    beforeEach(module('app'));

    beforeEach(inject(function(_APP_SETTINGS_, _$httpBackend_, _projectsService_) {
        APP_SETTINGS = _APP_SETTINGS_;
        httpBackend = _$httpBackend_;
        projectsService = _projectsService_;

    }));
});