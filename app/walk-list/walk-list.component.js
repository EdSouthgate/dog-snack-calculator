// Define the `walkListController` controller on the `phonecatApp` module
angular.
  module('walkList').
  component('walkList', {
    templateUrl: 'walk-list/walk-list.template.html',
    controller: ['$http', function WalkListController($http) {
      var self = this;
      $http.get('https://infinite-lake-80504.herokuapp.com/api/routes').then(function(response) {
        self.walks = response.data;
      });
    }]
  });
