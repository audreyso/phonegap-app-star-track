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
    it('should alert if no formdata exists / was entered');
    it('should make a request to the spotify API');
    it('should load spotify API results into the main view router');
    it('should alert if there was an error with the spotify API');
  });
});
