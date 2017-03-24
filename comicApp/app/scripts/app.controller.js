'use strict';

comicApp.controller('comicAppCtrl', function ComicAppController($scope, $route, $routeParams) {
        class Comic {
            constructor(name, issue, series, image, refName, refIssue) {
                this.name = name;
                this.issue = issue;
                this.series = series;
                this.image = image;
                this.refName = refName;
                this.refIssue = refIssue;
            }
        }
        $scope.comics = []
        $scope.names = ['Fantastic Four', 'X-Men', 'Hulk', 'Spider-Man', 'Batman']

        function createComics() {
            for (var i = 1; i <= $scope.names.length; i++) {
                var newComic = new Comic($scope.names[i - 1], "Issue " + i, $scope.names[i - 1], './images/' + $scope.names[i - 1].replace(" ", "").toLowerCase() + ".jpg", $scope.names[i - 1].replace(" ", ""), 1);
                $scope.comics.push(newComic);
            }

        }

        createComics();
    })
    .directive("scroll", function($window) {
        return function(scope, element, attrs) {

            angular.element($window).bind("scroll", function() {
                if (this.pageYOffset >= 20) {
                    scope.scrolling = true;
                } else {
                    scope.scrolling = false;
                }
                scope.$apply();
            });
        };
    });

// comic retrieval logic
// - only cover art is kept within the build part of the app
// ------------ //
// - Comic object needs to contain.
// - name of series
// - cover art image
// - issue
// ------------ //
// - when the image is clicked a call is sent to the server
// - name of series and issue number
// - this is then sent back in the correct order so the user can read the book