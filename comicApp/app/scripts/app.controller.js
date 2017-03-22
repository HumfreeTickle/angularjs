'use strict';

comicApp.controller('comicAppCtrl', function ComicAppController($scope) {
    $scope.repeat = [1, 2, 3, 4, 5];
    $scope.helloMessage = "Hello World";
    $scope.input;

    class Comic {
        constructor(name, issue, series, image) {
            this.name = name;
            this.issue = issue;
            this.series = series;
            this.image = image;
        }
    }
    $scope.comics = []
    $scope.names = ['Fantastic Four', 'X-Men', 'Hulk', 'Hulk', 'X-Men', 'Hulk', 'Hulk', 'X-Men', 'Hulk', 'Hulk', 'X-Men', 'Hulk', 'Hulk', 'X-Men', 'Hulk', 'Hulk', 'X-Men', 'Hulk', 'Hulk', 'X-Men', 'Hulk', 'Hulk', 'X-Men', 'Hulk', 'Hulk', 'X-Men', 'Hulk', 'Hulk', 'X-Men', 'Hulk', 'Hulk']

    function createComics(amount) {
        for (var i = 1; i <= amount; i++) {
            var newComic = new Comic($scope.names[i - 1], "Issue " + i, $scope.names[i - 1], './images/' + i + ".jpg");
            $scope.comics.push(newComic);
        }
    }

    createComics(16);
});