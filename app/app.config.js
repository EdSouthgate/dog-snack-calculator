'use strict';

angular.
  module('dogSnackCalculator').
  config(['$routeProvider',
    function config($routeProvider) {
      $routeProvider.
        when('/walks', {
          template: '<walk-list></walk-list>'
        }).
        when('/walks/:walkId', {
          template: '<walk-detail></walk-detail>'
        }).
        otherwise('/walks');
    }
  ]);
