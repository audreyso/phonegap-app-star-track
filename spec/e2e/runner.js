var phonegap = require('phonegap');
var spawn = require('child_process').spawn;
var path = require('path');
var args = require('yargs').argv;

var phonegap_server, appium;

function clean_up() {
  if (phonegap_server) phonegap_server.close();
  if (appium) appium.kill();
}

process.on('SIGINT', function() {
  console.log('RECEIVED SIGINT! Cleaning up and shutting down...');
  clean_up();
  process.exit(1);
});

function run_nightwatch(nw_args) {
  var nw = spawn(path.join('node_modules', '.bin', 'nightwatch'), nw_args);
  nw.stdout.on('data', function(data) { console.log(data.toString()); });
  nw.stderr.on('data', function(data) { console.error(data.toString()); });
  nw.on('exit', function(code, sig) {
    var exit_msg;
    if (code === 0) {
      exit_msg = 'End to end tests completed successfully, shutting down...';
    } else {
      exit_msg = 'Nightwatch exited with code ' + code + ' ' + (sig ? '(signal: ' + sig + ')' : '') + ', shutting down...';
    }
    console.log(exit_msg);
    clean_up();
    process.exit(code);
  });
}

if (args.env && (args.env == 'ios' || args.env == 'android')) {
  // Start appium and automate the hybrid app
  console.log('Starting appium...');
  appium = spawn(path.join('node_modules', 'appium', 'build', 'lib', 'main.js'), ['--chromedriver-executable', require('chromedriver').path]);
  var startup_timeout = setTimeout(function() {
    console.error('Appium not ready after 5 seconds. Closing down. Your appium instance probably has issues! Check the logs in this output');
    appium.kill();
  }, 5000);
  appium.stdout.on('data', function(data) {
    var out = data.toString();
    if (out.indexOf('listener started') > -1) {
      // Appium is ready! Let's do this.
      clearTimeout(startup_timeout);
      var nw_args = ['-c', path.join('spec', 'e2e', 'nightwatch.conf.js'), '--env', args.env];
      run_nightwatch(nw_args);
    } else {
      if (args.verbose) console.log(data.toString());
    }
  });
  appium.stderr.on('data', function(data) { console.error(data.toString()); });
} else {
  // Start phonegap-serve and run the tests in a browser.
  console.log('Kicking up `phonegap serve`...');
  phonegap.serve({}, function(err, evt) {
    if (err) console.error('Error!', err);
    else {
      if (evt && evt.address && evt.port) {
        console.log('Server up at http://' + evt.address + ':' + evt.port);
        console.log('Running nightwatch...');
        phonegap_server = evt.server;
        var nw_args = ['-c', path.join('spec', 'e2e', 'nightwatch.conf.js')];
        if (args.env) nw_args.concat(['--env', args.env]);
        run_nightwatch(nw_args);
      }
    }
  });
}
