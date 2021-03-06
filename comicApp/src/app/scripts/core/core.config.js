(function() {
    'use strict';
    var core = angular.module('comicApp.core', ['ngRoute']);
    core.config(appLayout);

    appLayout.$inject = ['$routeProvider', '$locationProvider'];
    /* @ngInject */
    function appLayout($routeProvider, $locationProvider) {
        var views = 'views/';
        $routeProvider
            .when('/', {
                templateUrl: './views/content.html',
                controller: 'homepageCtrl'
            })
            .when('/about', {
                templateUrl: './views/about.html',
                controller: 'aboutpageCtrl'
            })
            .when('/:comic/issue/:issue', {
                templateUrl: './views/comic.html',
                controller: 'comicpageCtrl'
            })
            .otherwise({
                redirect: '/'
            });
        $locationProvider.html5Mode(true);
    }
})();