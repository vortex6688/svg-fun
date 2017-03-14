'use strict';

/**
 * @author: @AngularClass
 */

require('ts-node/register');
var helpers = require('./helpers');
var SpecReporter = require('jasmine-spec-reporter').SpecReporter;
var JUnitXmlReporter = require('jasmine-reporters').JUnitXmlReporter;

exports.config = {
  baseUrl: 'http://localhost:3000/',

  // use `npm run e2e`
  specs: [
    helpers.root('src/**/**.e2e.ts'),
    helpers.root('src/**/*.e2e.ts')
  ],
  exclude: [],

  framework: 'jasmine2',

  allScriptsTimeout: 110000,

  jasmineNodeOpts: {
    showTiming: true,
    showColors: true,
    isVerbose: false,
    includeStackTrace: false,
    defaultTimeoutInterval: 400000,
    print: function() {} // this disables writing . for each test
  },
  directConnect: true,

  capabilities: {
    'browserName': 'chrome',
    'chromeOptions': {
      'args': ['show-fps-counter=true']
    }
  },

  onPrepare: function() {
    browser.ignoreSynchronization = true;
    jasmine.getEnv().addReporter(new SpecReporter({
      spec: {
        displayStacktrace: true
      }
    }));



    // returning the promise makes protractor wait for the reporter config before executing tests
    return browser.getProcessedConfig().then(function(config) {
        // you could use other properties here if you want, such as platform and version
        var browserName = config.capabilities.browserName;
        var junitReporter = new JUnitXmlReporter({
            consolidateAll: true,
            savePath: './dist/tests/junit/' + browserName,
            // this will produce distinct xml files for each capability
            filePrefix: 'e2e',
        });
        jasmine.getEnv().addReporter(junitReporter);
    });
  },

  /**
   * Angular 2 configuration
   *
   * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
   * `rootEl`
   */
   useAllAngular2AppRoots: true
};
