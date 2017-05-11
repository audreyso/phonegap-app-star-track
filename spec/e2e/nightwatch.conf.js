var path = require('path');

module.exports = {
  "src_folders" : ["spec/e2e/tests"],
  "output_folder": false,
  "custom_commands_path" : "",
  "custom_assertions_path" : "",
  "page_objects_path" : "",
  "selenium" : {
    "start_process" : true,
    "server_path" : "node_modules/selenium-server/lib/runner/selenium-server-standalone-3.4.0.jar",
    "log_path" : "",
    "port" : 4444,
    "cli_args" : {
      "webdriver.chrome.driver" : require('chromedriver').path
    }
  },
  "test_settings" : {
    "default" : {
      "launch_url" : "http://localhost:3000",
      "selenium_port"  : 4444,
      "selenium_host"  : "localhost",
      "silent": false,
      "desiredCapabilities": {
        "browserName": "chrome"
      }
    }
  }
}
