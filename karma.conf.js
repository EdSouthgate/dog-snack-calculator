//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: './app',

    files: [
      'https://maps.googleapis.com/maps/api/js?sensor=false',
      'test/mocks/angular-google-maps.js', //<--and this one, changing path as necessary for the mock file you just added
      'lib/angular/angular.js',
      'lib/angular-route/angular-route.js',
      '../node_modules/angular-mocks/angular-mocks.js',
      '**/*.module.js',
      '*!(.module|.spec).js',
      '!(lib)/**/*!(.module|.spec).js',
      '**/*.spec.js'
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
