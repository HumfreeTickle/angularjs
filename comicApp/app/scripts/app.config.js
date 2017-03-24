'use strict';

comicApp.config(function($routeProvider, $locationProvider) {
    var views = './views/';
    $routeProvider
        .when('/', {
            templateUrl: views + 'content.html',
            controller: 'comicAppCtrl'
        })
        .when('/about', {
            templateUrl: views + 'about.html',
            controller: 'aboutCtrl'
        })
        .when('/:comic/issue/:issue', {
            templateUrl: views + 'comic.html',
            controller: 'comicBookCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    $locationProvider.html5Mode(true);
});