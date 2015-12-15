'use strict';

describe('Unit: profileService', function() {

    var APP_SETTINGS, httpBackend, documentsService, uploadCalled;

    beforeEach(module('app'));

    beforeEach(inject(function(_APP_SETTINGS_, _$httpBackend_, _documentsService_) {
        APP_SETTINGS = _APP_SETTINGS_;
        httpBackend = _$httpBackend_;
        documentsService = _documentsService_;

    }));
});
