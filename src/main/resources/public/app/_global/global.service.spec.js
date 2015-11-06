'use strict';

describe('Unit: globalService', function() {
    var globalService, httpBackend, $cookies, APP_SETTINGS;
    beforeEach(module('app'));

    beforeEach(inject(function(_globalService_, _$httpBackend_, _$cookies_, _APP_SETTINGS_) {
        globalService = _globalService_;
        httpBackend = _$httpBackend_;
        $cookies = _$cookies_;
        APP_SETTINGS = _APP_SETTINGS_;
    }));

 });
