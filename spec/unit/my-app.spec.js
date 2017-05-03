describe('my-app.js', function() {
  describe('pad2 function', function() {
    it('should pad single digit numbers with a leading 0', function() {
      expect(pad2(9)).toEqual('09');
    });
    it('should not pad double-digit numbers', function() {
      expect(pad2(11)).toEqual('11');
    });
  });

  describe('searchSubmit function', function() {
    var event;
    var original_mainView;
    beforeEach(function() {
      event = jasmine.createSpyObj('fake event', ['preventDefault']);
      original_mainView = mainView;
    });
    afterEach(function() {
      mainView = original_mainView;
    });
    it('it should always prevent default event propagation', function() {
      searchSubmit(event);
      expect(event.preventDefault).toHaveBeenCalled();
    });
    it('should alert if no formdata exists / was entered', function() {
      spyOn(myApp, 'alert');
      searchSubmit(event);
      expect(myApp.alert).toHaveBeenCalledWith('Please enter a search term', jasmine.any(String));
    });
    it('should make a request to the spotify API', function() {
      spyOn($$, 'ajax');
      spyOn(myApp, 'formToJSON').and.returnValue({q: 'jetlagmakesmefeelfunny'});
      searchSubmit(event);
      expect($$.ajax).toHaveBeenCalled();
    });
    it('should load spotify API results into the main view router', function() {
      var fake_results = {
        tracks: {
          items: ['blue suede shoes', 'hound dog']
        }
      };
      spyOn($$, 'ajax').and.callFake(function(obj) {
        obj.success(fake_results);
      });
      spyOn(myApp, 'formToJSON').and.returnValue({q: 'elvis'});
      mainView = {
        router: {
          load: jasmine.createSpy('load spy')
        }
      };
      searchSubmit(event);
      expect(mainView.router.load).toHaveBeenCalledWith({
        template: undefined,
        context: {
          tracks: fake_results.tracks
        }
      });
      expect(fake_results.tracks.count).toEqual(fake_results.tracks.items.length);
    });
    it('should alert if there was an error with the spotify API');
  });
});
