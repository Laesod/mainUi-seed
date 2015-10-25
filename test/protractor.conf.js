'use strict';

exports.config = {

  allScriptsTimeout: 11000,

  baseUrl: 'http://localhost:6031/',

  multiCapabilities: [{
    browserName: 'firefox',
    platform: 'ANY'
  }, {
    browserName: 'chrome',
    platform: 'ANY'
  }],

  framework: 'jasmine',

  jasmineNodeOpts: {
    isVerbose: false,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  },

  specs: [
    'e2e/**/*.js'
  ]

};