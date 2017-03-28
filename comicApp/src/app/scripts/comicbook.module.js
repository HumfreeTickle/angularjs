(function() {
    'use strict';
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
    angular
        .module('comicApp.comicPage', [])
        .controller('comicpageCtrl', ComicAppController)
        .run(appRun);

    ComicAppController.$inject = ['$scope', '$routeParams', '$http'];

    function ComicAppController($scope, $routeParams, $http) {
        $scope.params = $routeParams;
        $scope.currentPage = 0;
        $scope.pages = null;
        var server = './src/server/images_server/';

        $scope.changePageRight = function() {
            if ($scope.currentPage < $scope.pages.length - 1) {
                $scope.currentPage += 1;
                updatePage();
            }
        };
        $scope.changePageLeft = function() {
            if ($scope.currentPage > 0) {
                $scope.currentPage -= 1;
                updatePage();
            }
        };

        function updatePage() {
            if ($scope.pages != null) {
                $scope.page = server + $scope.params.comic.toLowerCase() + $scope.pages[$scope.currentPage];
            }
        }

        function getPages() {
            var series = $scope.params.comic.toLowerCase();
            $http.get(server + series + '/issues.json').then(function(data) {
                $scope.pages = data.data["issue_" + $scope.params.issue];
                updatePage();
            }, function(err) {
                // your error function
                if (err.status === 404) {
                    console.log('error: ' + err);
                }
            });
        }

        getPages();

        $scope.$on('right', function() {
            $scope.changePageRight();
        });
        $scope.$on('left', function() {
            $scope.changePageLeft();
        });

    }

    function appRun($rootScope) {

        $(document).keyup(function(event) {
            if (event.keyCode === 39 || event.keyCode === 68) {

                $rootScope.$broadcast('right');
                $rootScope.$apply();
            } else if (event.keyCode === 37 || event.keyCode === 65) {

                $rootScope.$broadcast('left');
                $rootScope.$apply();
            }
        });
    }
})();

// TODO
// :series/issue/:number