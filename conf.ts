// Because this file imports from `protractor` npm package, 
// you'll need to have it as a project dependency. 
//
// `baseUrl` property is passed in as a param
import { Config, browser } from 'protractor';
import { SpecReporter } from 'jasmine-spec-reporter';

var retry = require('protractor-retry').retry;

export let config: Config = {
  allScriptsTimeout: 110000,
  framework: 'jasmine',
  capabilities: {
    browserName: 'chrome',
    chromeOptions: {
      args: ["--start-maximized, --headless, --incognito"]
    }
  },
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 150000,
    //print: function() {}
  },

  // Keep max browsers running to 1 because
  // multiple browsers running at once was pausing/failing for no reason
  maxSessions: 1,

  // You could set no globals to true to avoid jQuery '$' and protractor '$'
  // collisions on the global namespace.
  noGlobals: true,

  onCleanUp: function (results) {
    retry.onCleanUp(results);
  },

  onPrepare: function () {
    // Use `jasmine-spec-reporter` as the spec result reporter
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));

    browser.driver.manage().window().maximize();
    //retry.onPrepare();

  },

  afterLaunch: function () {
    return retry.afterLaunch(2);
  },

  params: {
    baseUrl: 'https://www.lego.com/es-es'
  },
  specs: ['specs/**/*.spec.js'],

  seleniumAddress: 'http://localhost:4444/wd/hub'
};
