// Define the `walkListController` controller on the `phonecatApp` module
angular.
  module('walkDetail').
  component('walkDetail', {
    templateUrl: 'walk-detail/walk-detail.template.html',
    controller: [ '$http', '$routeParams',
      function WalkDetailController($http, $routeParams) {
        var self = this;
        $http.get('https://infinite-lake-80504.herokuapp.com/api/routes/' + $routeParams.walkId).then(function(response) {
          self.walk = response.data;
          self.snackAmount = calculateSnacks(self.walk);
          initializeMap(self.walk);
        })
        var calculateSnacks = function(data) {
          var snackCount = 0;
          var reserve = 0;
          for(var i = 0; i < data.locations.length; i++) {
            var currentLocation = data.locations[i].altitude;
            if(i > 0) {
              var previousLocation = data.locations[i - 1].altitude;
              if(previousLocation) {
                var differenceInAltitude = currentLocation - previousLocation;
                if(previousLocation < currentLocation && differenceInAltitude >= 1) {
                  if(reserve > 0) {
                    reserve -= differenceInAltitude;
                    if(reserve < 0) {
                      snackCount += reserve;
                      reserve = 0;
                    }
                  } else {
                    snackCount += differenceInAltitude;
                  }
                } else if(previousLocation > currentLocation && differenceInAltitude <= -1) {
                  reserve -= differenceInAltitude;
                }
              }
            }
          }
          return snackCount;
        }

        var initializeMap = function (data) {
          var walkStart = {lat: data.locations[0].latitude, lng: data.locations[0].longitude};
          var walkEnd = {lat: data.locations[data.locations.length - 1].latitude, lng: data.locations[data.locations.length - 1].longitude}
          var midPoint = {lat: (walkStart.lat + walkEnd.lat)/2, lng: (walkStart.lng + walkEnd.lng)/2};
          var map = new google.maps.Map(document.getElementById('map'), {
                    center: midPoint,
                    zoom: 17
                  });
          var startFlag = 'https://executiveedge.ie/wp-content/plugins/google-maps/assets/images/icons/greenmarker24.png';
          var endFlag = 'https://executiveedge.ie/wp-content/plugins/google-maps/assets/images/icons/redmarker24.png'
          var walkStartMarker = new google.maps.Marker({
            position: walkStart,
            map: map,
            icon: startFlag,
            title: "Walk start"
          });
          var walkEndMarker = new google.maps.Marker({
            position: walkEnd,
            map: map,
            icon: endFlag,
            title: "Walk end"
          });
          var walkCoordinates = [];
          for(var i = 0; i < data.locations.length; i++) {
            walkCoordinates.push({lat: data.locations[i].latitude, lng: data.locations[i].longitude})
          }
          var walkPath = new google.maps.Polyline({
            path: walkCoordinates,
            geodesic: true,
            strokeColor: '#0384fc',
            strokeOpacity: 1.0,
            strokeWeight: 4
          });

          walkPath.setMap(map);
        }

      }
    ]
  });
