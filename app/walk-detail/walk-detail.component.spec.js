describe('walkDetail', function() {

  beforeEach(module('walkDetail'));
  describe('walkDetailController', function() {
    var $httpBackend, ctrl;

    beforeEach(inject(function($componentController, _$httpBackend_, $routeParams) {
      $httpBackend = _$httpBackend_;
      $routeParams.walkId = 1;
      $httpBackend.expectGET('https://infinite-lake-80504.herokuapp.com/api/routes/1')
                  .respond({id: 1,name: "Walk A",locations: [{altitude: 10,latitude: 51.51973438454002,longitude: -0.1222349703313059},{altitude: 0,latitude: 51.51975093879879,longitude: -0.1222902908922381},{altitude: 6,latitude: 51.51968937371999,longitude: -0.1225241459907242},{altitude: 15,latitude: 51.51955128186523,longitude: -0.1227341126651715},{altitude: 8,latitude: 51.51940237735539,longitude: -0.1229298301042271}]});

      ctrl = $componentController('walkDetail');
    }))
    it('should create a `walk` property with an id, name and locations key fetched with `$http`', function() {
      expect(ctrl.walk).toBeUndefined();

      $httpBackend.flush();
      console.log(ctrl.walk);
      expect(ctrl.walk.id).toBe(1);
      expect(ctrl.walk.name).toBe("Walk A");
      expect(ctrl.walk.locations.length).toBe(5);
    });
    it('should correctly calculate the amount of snacks required for the walk', function() {
      walkData = {id: 1,name: "Walk A",locations: [{altitude: 0,latitude: 51.51973438454002,longitude: -0.1222349703313059},{altitude: 2,latitude: 51.51975093879879,longitude: -0.1222902908922381},{altitude: 0,latitude: 51.51968937371999,longitude: -0.1225241459907242},{altitude: 6,latitude: 51.51955128186523,longitude: -0.1227341126651715},{altitude: 2,latitude: 51.51940237735539,longitude: -0.1229298301042271}]}
      var snacks = ctrl.calculateSnacks(walkData);
      expect(snacks).toBe(6);
    })
  })

});
