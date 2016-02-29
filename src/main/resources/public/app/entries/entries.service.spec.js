'use strict';

describe('Unit: entriesService', function() {

    var APP_SETTINGS, httpBackend, entriesService;

    beforeEach(module('app'));

    beforeEach(inject(function(_APP_SETTINGS_, _$httpBackend_, _entriesService_) {
        APP_SETTINGS = _APP_SETTINGS_;
        httpBackend = _$httpBackend_;
        entriesService = _entriesService_;

    }));
});