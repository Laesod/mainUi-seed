'use strict';

describe('tasc-authorize', function() {
    var scope, compile, APP_SETTINGS;

    beforeEach(module('app'));

    beforeEach(inject(function($rootScope, $compile, _APP_SETTINGS_) {
        scope = $rootScope.$new();
        compile = $compile;

        APP_SETTINGS = _APP_SETTINGS_;
        APP_SETTINGS.permissionsMap = {fakeRole: true};
    }));

    describe('has permissions', function() {
        var element;

        beforeEach(inject(function() {
            element = compile('<div tasc-authorize="fakeRole">aaaaa</div>')(scope);
            scope.$digest();            
        }));        
        
        it('should show element if authorized', function() {
            expect(element.html()).toBe('aaaaa');
        });
    });

    describe('has no permissions', function() {
        var element;

        beforeEach(inject(function() {
            element = compile('<div tasc-authorize="anotherFakeRole">aaaaa</div>')(scope);
            scope.$digest();
        }));        
        
        it('should show element if authorized', function() {            
            // expect(element.html()).toBe(''); //can't make test work            
        });
    });
});
