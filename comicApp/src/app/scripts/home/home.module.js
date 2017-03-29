(function() {
    'use strict';
    var home_page = angular
        .module('comicApp.homePage', ['ngRoute'])
        .controller('homepageCtrl', ComicAppController)
        .directive('scroll', scrollDirective);

    ComicAppController.$inject = ['$scope', '$route', '$routeParams'];
    /* @ngInject */
    function ComicAppController($scope, $route, $routeParams) {
        $scope.comics = [];
        $scope.names = ['Fantastic Four', 'X-Men', 'Hulk', 'Spider-Man', 'Batman'];

        function createComics() {
            for (var i = 1; i <= $scope.names.length; i++) {
                var newComic = {
                    name: $scope.names[i - 1],
                    issue: 'Issue ' + i,
                    series: $scope.names[i - 1],
                    image: './images/' + $scope.names[i - 1].replace(' ', '').toLowerCase() + '.jpg',
                    refName: $scope.names[i - 1].replace(' ', ''),
                    refIssue: 1
                };
                $scope.comics.push(newComic);
            };

        };

        createComics();
    }

    scrollDirective.$inject = ['$window'];
    /* @ngInject */
    function scrollDirective($window) {
        return function(scope, element, attrs) {

            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= 40) {
                    scope.scrolling = true;
                } else {
                    scope.scrolling = false;
                }
                scope.$apply();
            });
        };
    }

})();