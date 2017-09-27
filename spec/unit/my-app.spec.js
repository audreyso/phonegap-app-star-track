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
    it('should make a request to the iTunes API', function() {
      spyOn($$, 'ajax');
      spyOn(myApp, 'formToJSON').and.returnValue({term: 'john'});
      searchSubmit(event);
      expect($$.ajax).toHaveBeenCalled();
    });
    it('should alert if there was an error with the iTunes API', function() {
      spyOn($$, 'ajax').and.callFake(function(obj) {
        obj.error({}, 'uh oh!');
      });
      spyOn(myApp, 'formToJSON').and.returnValue({q: 'elvis'});
      spyOn(myApp, 'alert');
      searchSubmit(event);
      expect(myApp.alert).toHaveBeenCalledWith('Please enter a search term', 'Search Error');
    });
  });
});
