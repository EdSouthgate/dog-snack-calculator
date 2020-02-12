describe('walkList', function() {
  // Load the module that contains the `phoneList` component before each test
  beforeEach(module('walkList'));
  describe('walkListController', function() {
    var $httpBackend, ctrl;

    // Test the controller
    beforeEach(inject(function($componentController, _$httpBackend_) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('https://infinite-lake-80504.herokuapp.com/api/routes')
                  .respond([{id: 1,name: "Walk A"},{id: 2,name: "Walk B"},{id: 3,name: "Walk C"}]);
      ctrl = $componentController('walkList');
    }))
    it('should create a `walks` property with 3 walks fetched with `$http`', function() {
      expect(ctrl.walks).toBeUndefined();

      $httpBackend.flush();
      expect(ctrl.walks).toEqual([{id: 1,name: "Walk A"},{id: 2,name: "Walk B"},{id: 3,name: "Walk C"}]);
    });
  })

});
