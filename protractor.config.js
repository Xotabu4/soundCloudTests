"use strict";

//Full protractor config documentaion is available on https://github.com/angular/protractor/blob/master/lib/config.ts

exports.config = {
  //Will be used as URL to open pages with browser.get
  baseUrl: 'https://soundcloud-ngrx.herokuapp.com',

  //What specs files to load? Here you can pass array of strings with wildcards
  specs: ['./specs/*_spec.js'],

  //Allows us to not start selenium server for tests. Useful for development.
  directConnect: true,

  //What test runner we are using
  framework: 'jasmine2',

  /**
    Browser properties, also called as DesiredCapabilities. Allows to configure a lot of browser aspects.
    Documentation for NOT FULL list of capabilites could be found here: https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
  */
  capabilities: {
    'browserName': 'chrome'
  },

  //This tells protractor that we have Angular 2 app on the page, so synchronizing with it should be done differently than with Angular 1
  useAllAngular2AppRoots: true,
  
  // Option to sychronize with angular 1 applications, put css selector that will find element with ng-app attribute.
  //rootElement: 'html',

  /**
    Some of protractor life-circle methods. Provided function will be called when browser is started, and your test runner (jasmine2) is initialized.
    You can define some extra logic here, such as reporters, pre/post conditions.
  */
  onPrepare: function () {

    global.SMALL_TIMEOUT = 2000;
    
    // implicitlyWait - hidden wait for element existence
    browser.manage().timeouts().implicitlyWait(3000);

    //Setting global beforeEach for all tests.
    beforeEach(function () {
        browser.get('/');
    });
    //Global afterEach for all tests
    afterEach(function () {
        //Wiping cookie files ONLY for current domain
        browser.manage().deleteAllCookies();
        //Wiping local and session storage
        browser.executeScript('window.sessionStorage.clear(); window.localStorage.clear();')
        .then(undefined,
        function (err) {
            // Errors will be thrown when browser is on default data URL.
            // Session and Local storage is disabled for data URLs
        });
    });

    //Defining nice console reporter
    let JasmineReporter = require('jasmine2-reporter').Jasmine2Reporter

    //Options object for console reporter
    let options = {
      pendingSpec: false,
      symbols: {
        pending: '*  '.strikethrough,
      }
    };
    //Adding reporter to jasmine.
    jasmine.getEnv().addReporter(new JasmineReporter(options));
  }

  
};