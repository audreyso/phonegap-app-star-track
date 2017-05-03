describe('my-app.js', function() {
  describe('pad2 function', function() {
    it('should pad single digit numbers with a leading 0', function() {
      expect(pad2(9)).toEqual('09');
    });
    it('should not pad double-digit numbers', function() {
      expect(pad2(11)).toEqual('11');
    });
  });
});
