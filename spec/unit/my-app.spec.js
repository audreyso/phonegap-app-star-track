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
    beforeEach(function() {
      event = jasmine.createSpyObj('fake event', ['preventDefault']);
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
    it('should load spotify API results into the main view router');
    it('should alert if there was an error with the spotify API');
  });
});
