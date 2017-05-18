module.exports = {
  before: function(app, done) {
    if (app.globals && (app.globals.env == 'ios' || app.globals.env == 'android')) {
      app.contexts(function(cs) {
        var webview = cs.value[1]; // this is the webview ID
        app.setContext(webview, done);
      });
    } else {
      app.url(app.launchUrl, done);
    }
  },
  after: function(app, done) {
    app.end(done);
  },
  'entry page should contain a Find Tracks input element': function(app) {
    app.waitForElementVisible('input[value="Find Tracks"]', 5000);
  },
  'should show basic results': function(app) {
    app.
      waitForElementVisible('#query', 5000).
      pause(2000).
      setValue('#query', 'slim shady').
      pause(2000).
      submitForm('form#search').
      pause(2000).
      assert.containsText('div.item-subtitle', 'Eminem').
      pause(2000);
  }
};
