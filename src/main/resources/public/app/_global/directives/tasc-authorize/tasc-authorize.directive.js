'use strict';

var appModule = require('../../_index');

appModule.directive('tascAuthorize', function(APP_SETTINGS) {
    return {
        restrict: 'A',

        compile: function(el, attrs) {
            if(!APP_SETTINGS.permissionsMap[attrs.tascAuthorize]) {
                this.template = '<span style="display: none;"></span>';
                this.replace = true;
            }
        }
    };
});
